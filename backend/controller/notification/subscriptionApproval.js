const courseModel = require("../../model/courseModel/course")
const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
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

class SubscriptionApprovalController {
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

    // request for subscription
    async requestForSubscription(req, res) {
        try {
            const { courseID } = req.body

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })
            if (!existingCourse || existingCourse.isDeleted === true || existingCourse.isPublished === false) {
                return res.status(400).send(failure("This course does not exist or is not published. Please enter a valid course."))
            }

            // check is student is already enrolled in the course
            const student = await authModel.findOne({ _id: req.user._id })
                .populate({
                    path: "studentID",
                    select: "email",
                });

            // find the student in student model using the email
            if (!student) {
                return res.status(400).send(failure("Student not found"))
            }

            console.log("Student", student)

            const existingStudent = await studentModel.findOne({ email: student.email })

            console.log("existingStudent", existingStudent)

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found"))
            }

            if (existingStudent.enrolledCourses.includes(existingCourse._id)) {
                return res.status(400).send(failure("You are already enrolled in this course."))
            }

            const notification = {
                type: "subscription_request",
                userID: student._id,
                courseID: existingCourse._id,
                message: `${req.user.username} has requested to subscribe for a course, ${existingCourse.title}.`,
            }

            await notificationModel.create(notification)
            return res.status(200).send(success("Course published successfully and notification has been sent to the admin for approval."))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // show all notification (for admin)
    async showAllSubscriptionRequest(req, res) {
        try {
            const notifications = await notificationModel.find()
            return res.status(200).send(success(notifications))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // accept or reject a subscription
    async acceptOrRejectSubscription(req, res) {
        try {
            const { notificationID, action } = req.body;

            if (!notificationID || !action) {
                return res.status(400).send(failure("Please provide all the fields."));
            }

            let isSubscriptionApproved = action === 'approve' ? true : false;

            const existingNotification = await notificationModel
                .findOne({ _id: new mongoose.Types.ObjectId(notificationID) })
                .populate({
                    path: "userID",
                    select: "username email",
                });

            console.log(existingNotification)

            if (!existingNotification) {
                return res.status(400).send(failure("This notification does not exist. Please enter a valid notification."));
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingNotification.courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("This course does not exist."));
            }

            if (existingCourse.isApproved !== true) {
                return res.status(400).send(failure("This course has not been approved by admin."));
            }

            const existingStudent = await studentModel.findOne({ email: existingNotification.userID.email });

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found"))
            }

            if (existingStudent.enrolledCourses.includes(existingCourse._id)) {
                return res.status(400).send(failure("You are already enrolled in this course."))
            }

            if (action === 'approve') {
                // add the course to the enrolledCourses of the student
                isSubscriptionApproved = true
                existingStudent.enrolledCourses.push(existingCourse._id);
                await existingStudent.save();
            } else if (action === 'reject') {
                isSubscriptionApproved = false
            } else {
                return res.status(400).send(failure("Invalid action. Please provide 'approve' or 'reject'."));
            }

            existingNotification.status = "read";
            await existingNotification.save();

            if (existingNotification.status === "read") {
                return res.status(400).send(failure("This course has been reviewed already."));
            }

            // Create an email
            const SubscriptionApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "subscription-approval");

            // Compose the email
            const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/SubscriptionApprovalEmail.ejs'), {
                name: existingNotification.userID.username,
                courseName: existingCourse.title,
                isSubscriptionApproved: isSubscriptionApproved,
                SubscriptionApprovalEmailURL: SubscriptionApprovalEmailURL,
            });

            // Send the email
            const emailResult = await sendMail(existingNotification.userID.email, "Subscription Approval", htmlBody);

            if (!emailResult) {
                return res.status(400).send(failure("Failed to send email."));
            }

            return res.status(200).send(success(`Subscription has been ${action === 'approve' ? 'approved' : 'rejected'} successfully.`));

        } catch (error) {
            console.log("error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

}
module.exports = new SubscriptionApprovalController()