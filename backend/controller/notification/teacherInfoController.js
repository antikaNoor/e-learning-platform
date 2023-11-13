const teacherModel = require("../../model/authModel/teacher");
const notificationModel = require("../../model/notificationModel/notification");
const { success, failure } = require("../../utils/successError");
const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const { promisify } = require('util')
const ejs = require('ejs');
const ejsRenderFile = promisify(ejs.renderFile)
const { sendMail } = require('../../config/sendMail')

class TeacherController {
    async createValiadtion(req, res, next) {
        try {
            const validation = validationResult(req).array();
            if (validation.length > 0) {
                return res.status(400).send({ message: "validation error", validation });
            }
            next();
        } catch (error) {
            console.log("error has occurred");
        }
    }

    // add teacher information
    async addTeacherInfo(req, res) {
        try {
            const { educationalBackground, teachingExperience } = req.body;

            if (!educationalBackground || !teachingExperience) {
                return res.status(400).send(failure("All fields are required."));
            }

            const existingTeacher = await teacherModel.findOne({ email: req.user.email });

            if (!existingTeacher) {
                return res.status(400).send(failure("Teacher not found."));
            }

            const admin = await authModel.findOne({ role: "admin" })

            if (!admin) {
                return res.status(400).send(failure("Admin not found"))
            }

            // if the fields are already filled up, ask the teacher to edit it.
            if (existingTeacher.educationalBackground.length > 0 || existingTeacher.teachingExperience.length > 0) {
                return res.status(400).send(failure("Teacher information already filled up and admin has been notified."));
            }

            // Create an array of education background
            const formattedTeachingEducation = educationalBackground.map(edu => {
                const { univesity, major, cgpa } = edu;
                return { univesity, major, cgpa };
            });

            // Create an array of teaching experiences
            const formattedTeachingExperience = teachingExperience.map(exp => {
                const { institution, duration, description } = exp;
                return { institution, duration, description };
            });

            // Update the existing teacher with the new educational background and teaching experience
            existingTeacher.educationalBackground = formattedTeachingEducation;
            existingTeacher.teachingExperience = formattedTeachingExperience;

            // Save the updated teacher to the database
            await existingTeacher.save();

            // send notification to admin
            const notification = {
                type: "teacher_approval",
                to: admin._id,
                from: req.user._id,
                message: `${req.user.username} has requested to be a teacher.`,
            }

            await notificationModel.create(notification)
            return res.status(200).send(success("Information added successfully and notification has been sent to the admin for approval."))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

    // admin accept or rejects teacher
    async acceptOrRejectTeacher(req, res) {
        try {
            const { notificationID, action } = req.body;

            if (!notificationID || !action) {
                return res.status(400).send(failure("Please provide all the fields."));
            }

            const isTeacherApproved = action === 'approve' ? true : false;

            const existingNotification = await notificationModel
                .findOne({ _id: new mongoose.Types.ObjectId(notificationID) })
                .populate({
                    path: "userID",
                    select: "username email",
                });

            if (!existingNotification) {
                return res.status(400).send(failure("This notification does not exist. Please enter a valid notification."));
            }

            const existingTeacher = await teacherModel.findOne({ email: existingNotification.userID.email });

            if (!existingTeacher) {
                return res.status(400).send(failure("This teacher does not exist. Please enter a valid teacher."));
            }

            if (existingTeacher.isApproved === true) {
                return res.status(400).send(failure("This teacher has already been approved."));
            }

            existingNotification.status = "read";
            await existingNotification.save()

            if (action === 'approve') {
                existingTeacher.isApproved = true;
                existingTeacher.approvalDate = new Date();
                await existingTeacher.save()

                // Create an email
                const teacherApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "teacher-approval");

                // Compose the email
                const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/teacherApprovalEmail.ejs'), {
                    name: existingNotification.userID.username,
                    isTeacherApproved: isTeacherApproved,
                    teacherApprovalEmailURL: teacherApprovalEmailURL,
                });

                // Send the email
                const emailResult = await sendMail(existingNotification.userID.email, "Teacher Approval", htmlBody);

                if (!emailResult) {
                    return res.status(400).send(failure("Failed to send email."));
                }

                return res.status(200).send(success(`Teacher request has been approved successfully.`));
            }

            if (action === 'reject') {
                // Create an email
                const teacherApprovalEmailURL = path.join(process.env.BACKEND_AUTH_URL, "teacher-approval");

                // Compose the email
                const htmlBody = await ejsRenderFile(path.join(__dirname, '../../views/teacherApprovalEmail.ejs'), {
                    name: existingNotification.userID.username,
                    isTeacherApproved: isTeacherApproved,
                    teacherApprovalEmailURL: teacherApprovalEmailURL,
                });

                // Send the email
                const emailResult = await sendMail(existingNotification.userID.email, "Teacher Approval", htmlBody);

                if (!emailResult) {
                    return res.status(400).send(failure("Failed to send email."));
                }

                return res.status(200).send(success(`Teacher request has been rejected successfully.`));
            }

            return res.status(400).send(failure("Invalid action. Please enter 'approve' or 'reject'."));

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }
}

module.exports = new TeacherController();
