const courseModel = require("../../model/courseModel/course")
const authModel = require("../../model/authModel/auth")
const teacherModel = require("../../model/authModel/teacher")
const notificationModel = require("../../model/notificationModel/notification")
const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')

const { promisify } = require('util')
const ejs = require('ejs');
const ejsRenderFile = promisify(ejs.renderFile)
const { sendMail } = require('../../config/sendMail')

class courseApprovalController {
    async createValiadtion(req, res, next) {
        try {
            const validation = validationResult(req).array()
            if (validation.length > 0) {
                return res.status(400).send({ message: "validation error", validation })
            }
            next()
        } catch (error) {
            console.log("error has occured")
        }
    }

    // publish a course 
    async publishCourse(req, res) {
        try {
            const { courseID } = req.body

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })
            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("This course does not exist. Please enter a valid course."))
            }

            //only the teacher who created the course can publish the course
            if (!existingCourse.teacherID.equals(req.user._id)) {
                return res.status(400).send(failure("Only the teacher who created the course can publish the course."))
            }

            // now admin can review the course for approval
            existingCourse.isPublished = true
            await existingCourse.save()

            //send notification to admin for approval
            const admin = await authModel.findOne({ role: "admin" })
            if (!admin) {
                return res.status(400).send(failure("Admin not found"))
            }

            const notification = {
                type: "course_approval",
                userID: existingCourse.teacherID,
                courseID: existingCourse._id,
                message: `${req.user.username} has published a new course, ${existingCourse.title}.`,
            }

            await notificationModel.create(notification)
            return res.status(200).send(success("Course published successfully and notification has been sent to the admin for approval."))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // show all notification (for admin)
    async showAllNotification(req, res) {
        try {
            const notifications = await notificationModel.find()
            return res.status(200).send(success(notifications))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // accept or reject a course
    // accept or reject a course
    async acceptOrRejectCourse(req, res) {
        try {
            const { notificationID, action } = req.body;

            if (!notificationID || !action) {
                return res.status(400).send(failure("Please provide all the fields."));
            }

            const isCourseApproved = action === 'approve' ? true : false;

            const existingNotification = await notificationModel
                .findOne({ _id: new mongoose.Types.ObjectId(notificationID) })
                .populate({
                    path: "userID",
                    select: "username email",
                });

            if (!existingNotification) {
                return res.status(400).send(failure("This notification does not exist. Please enter a valid notification."));
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingNotification.courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("This course does not exist."));
            }

            if (existingCourse.isPublished !== true) {
                return res.status(400).send(failure("This course has not been published."));
            }

            if (existingCourse.isApproved === true) {
                return res.status(400).send(failure("This course has already been approved."));
            }

            const existingTeacher = await teacherModel.findOne({ email: existingNotification.userID.email });

            if (!existingTeacher && existingTeacher.isApproved !== true) {
                return res.status(400).send(failure("Teacher not found"))
            }

            existingNotification.status = "read";
            await existingNotification.save()

            if (action === 'approve') {
                existingCourse.isApproved = true;
                await existingCourse.save()
                // enter the course into teacher's coursesTaught
                existingTeacher.coursesTaught.push(existingCourse._id);
                await existingTeacher.save();

                // Create an email
                const courseApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "course-approval");

                // Compose the email
                const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/courseApprovalEmail.ejs'), {
                    name: existingNotification.userID.username,
                    courseName: existingCourse.title,
                    isCourseApproved: isCourseApproved,
                    courseApprovalEmailURL: courseApprovalEmailURL,
                });

                // Send the email
                const emailResult = await sendMail(existingNotification.userID.email, "Course Approval", htmlBody);

                if (!emailResult) {
                    return res.status(400).send(failure("Failed to send email."));
                }

                return res.status(200).send(success(`Course has been approved successfully.`));

            } else if (action === 'reject') {
                // Create an email
                const courseApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "course-approval");

                // Compose the email
                const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/courseApprovalEmail.ejs'), {
                    name: existingNotification.userID.username,
                    courseName: existingCourse.title,
                    isCourseApproved: isCourseApproved,
                    courseApprovalEmailURL: courseApprovalEmailURL,
                });

                // Send the email
                const emailResult = await sendMail(existingNotification.userID.email, "Course Approval", htmlBody);

                if (!emailResult) {
                    return res.status(400).send(failure("Failed to send email."));
                }

                return res.status(200).send(success(`Course has been rejected.`));
            }
            return res.status(400).send(failure("Invalid action. Please provide 'approve' or 'reject'."));
        } catch (error) {
            console.log("error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

}
module.exports = new courseApprovalController()