const courseModel = require("../../model/courseModel/course")
const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const notificationModel = require("../../model/notificationModel/notification")
const cartModel = require("../../model/subscriptionModel/cart")
const wishListModel = require("../../model/subscriptionModel/wishList")
const progressModel = require("../../model/courseModel/progress")
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

            const admin = await authModel.findOne({ role: "admin" })

            if (!admin) {
                return res.status(400).send(failure("Admin not found"))
            }

            // find the student in student model using the email
            if (!student) {
                return res.status(400).send(failure("Student not found"))
            }

            const existingStudent = await studentModel.findOne({ email: student.email })

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found"))
            }

            if (existingStudent.enrolledCourses.includes(existingCourse._id)) {
                return res.status(400).send(failure("You are already enrolled in this course."))
            }

            // if the student has already requested for subscription
            const existingRequest = await notificationModel.findOne({ userID: student._id, courseID: existingCourse._id });

            if (existingRequest) {
                return res.status(400).send(failure("You have already requested for subscription."))
            }

            const notification = {
                type: "subscription_request",
                to: admin._id,
                from: student._id,
                courseID: existingCourse._id,
                message: `${req.user.username} has requested to subscribe for a course, ${existingCourse.title}.`,
            }

            await notificationModel.create(notification)
            return res.status(200).send(success("Requested successfully and notification has been sent to the admin for approval."))

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
            const { notificationID } = req.params
            const { action } = req.body;

            if (!notificationID || !action) {
                return res.status(400).send(failure("Please provide all the fields."));
            }

            let isSubscriptionApproved = action === 'approve' ? true : false;

            const existingNotification = await notificationModel
                .findOne({ _id: new mongoose.Types.ObjectId(notificationID) })
                .populate({
                    path: "from",
                    select: "username email",
                });

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

            const student = await authModel.findOne({ _id: existingNotification.from._id })
            const existingStudent = await studentModel.findOne({ email: existingNotification.from.email });

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found"))
            }

            if (existingStudent.enrolledCourses.includes(existingCourse._id)) {
                return res.status(400).send(failure("You are already enrolled in this course."))
            }

            if (existingNotification.status === "read") {
                return res.status(400).send(failure("This notification has already been read."))
            }

            existingNotification.status = "read";
            await existingNotification.save()

            if (action === 'approve') {
                // add the course to the enrolledCourses of the student
                existingStudent.enrolledCourses.push(existingCourse._id);
                await existingStudent.save();

                // create the progress model for the student for the course
                const progress = new progressModel({
                    studentID: student._id,
                    courseID: existingCourse._id,
                    percentage: 0,
                });

                await progress.save();

                // remove from wish-list if the course is in the student's wish-list
                const existingWish = await wishListModel.findOne({ studentID: new mongoose.Types.ObjectId(existingStudent._id) });
                if (existingWish) {
                    existingWish.courseID = existingWish.courseID.filter(course => !course.equals(existingCourse._id));
                    await existingWish.save();
                }

                // remove from cart if the course is in the student's cart
                const existingCart = await cartModel.findOne({ studentID: new mongoose.Types.ObjectId(existingStudent._id) });
                if (existingCart) {
                    existingCart.courseID = existingCart.courseID.filter(course => !course.equals(existingCourse._id));
                    await existingCart.save();
                }

                // Create an email
                const SubscriptionApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "subscription-approval");

                // Compose the email
                const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/SubscriptionApprovalEmail.ejs'), {
                    name: existingNotification.from.username,
                    courseName: existingCourse.title,
                    isSubscriptionApproved: isSubscriptionApproved,
                    SubscriptionApprovalEmailURL: SubscriptionApprovalEmailURL,
                });

                // Send the email
                const emailResult = await sendMail(existingNotification.from.email, "Subscription Approval", htmlBody);

                if (!emailResult) {
                    return res.status(400).send(failure("Failed to send email."));
                }

                // send notification to the teacher that a student has subscribed to a course
                const notification = {
                    type: "course_subscribed",
                    to: existingCourse.teacherID,
                    from: existingStudent._id,
                    courseID: existingCourse._id,
                    message: `${existingStudent.username} has subscribed to your course, ${existingCourse.title}.`,
                }

                await notificationModel.create(notification)

                return res.status(200).send(success(`Subscription request for ${existingCourse.title} has been approved successfully.`));
            } else if (action === 'reject') {
                // Create an email
                const SubscriptionApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "subscription-approval");

                // Compose the email
                const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/SubscriptionApprovalEmail.ejs'), {
                    name: existingNotification.from.username,
                    courseName: existingCourse.title,
                    isSubscriptionApproved: isSubscriptionApproved,
                    SubscriptionApprovalEmailURL: SubscriptionApprovalEmailURL,
                });

                // Send the email
                const emailResult = await sendMail(existingNotification.from.email, "Subscription Rejection", htmlBody);

                if (!emailResult) {
                    return res.status(400).send(failure("Failed to send email."));
                }

                return res.status(200).send(success(`Subscription request for ${existingCourse.title} has been rejected.`));
            }
            return res.status(400).send(failure("Invalid action. Please provide 'approve' or 'reject'."));

        } catch (error) {
            console.log("error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

}
module.exports = new SubscriptionApprovalController()