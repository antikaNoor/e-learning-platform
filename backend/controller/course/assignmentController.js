const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const teacherModel = require("../../model/authModel/teacher")
const courseModel = require("../../model/courseModel/course")
const assignmentModel = require("../../model/courseModel/assignment")
const evaluationModel = require("../../model/courseModel/evaluation")
const progressModel = require("../../model/courseModel/progress")
const notificationModel = require("../../model/notificationModel/notification")

const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const { uploadFile, deleteFile, deleteFolder } = require("../../config/files")
// const fileTypes = require("../constants/fileTypes")
const fs = require('fs')
const path = require('path')
class AssignmentController {
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

    // add assignment
    async createAssignment(req, res) {
        try {
            const { courseID } = req.params
            const { title, question, totalMarks } = req.body

            if (!courseID || !title || !totalMarks) {
                return res.status(400).send(failure("Please fill all the fields"))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."))
            }

            const teacher = await teacherModel.findOne({ email: req.user.email })

            if (!teacher) {
                return res.status(400).send(failure("User not found"))
            }

            // check if teacher teacher this course
            // const authorizedCourses = teacher.coursesTaught.map(courseId => courseId.toString());

            // if (!authorizedCourses.includes(courseID.toString())) {
            //     return res.status(400).send(failure("You are not authorized to create assignments for this course."));
            // }

            // if there is a assignment against the course, throw error
            const existingAssignment = await assignmentModel.findOne({ courseID: courseID });

            if (existingAssignment) {
                return res.status(400).send(failure("Assignment already exists for this course."));
            }

            const assignment = new assignmentModel({
                courseID,
                title,
                question,
                totalMarks
            })

            // calculate pass marks
            const passMarks = totalMarks * 0.3

            // enter into database
            assignment.passMarks = passMarks

            await assignment.save()

            const response = assignment.toObject()
            delete response.__v
            delete response.updatedAt
            delete response.createdAt

            return res.status(200).send(success("Assignment added successfully", response))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // add documents
    // add notes to a lesson
    async addDocuments(req, res) {
        try {
            const { assignmentID } = req.params
            const documents = req.file

            if (!assignmentID || !documents) {
                return res.status(400).send(failure("Please enter the assignmentID and a document."))
            }

            const existingAssignment = await assignmentModel.findOne({ _id: new mongoose.Types.ObjectId(assignmentID) })

            if (!existingAssignment) {
                return res.status(400).send(failure("The specified assignment does not exist. Please enter a valid assignment."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingAssignment.courseID), isDeleted: false })

            if (!existingCourse) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."))
            }

            const teacher = await teacherModel.findOne({ email: req.user.email })

            if (!teacher) {
                return res.status(400).send(failure("User not found"))
            }

            // check if teacher teaches this course
            // const authorizedCourses = teacher.coursesTaught.map(courseId => courseId.toString());

            // if (!authorizedCourses.includes(existingCourse._id.toString())) {
            //     return res.status(400).send(failure("You are not authorized to add assignments to this course."));
            // }

            // push the video inside the videos array
            const uploadRes = await uploadFile(documents, "assignment")

            if (!uploadRes) {
                return res.status(400).send(failure("Error uploading video."))
            }

            existingAssignment.documents.push(uploadRes)
            await existingAssignment.save()

            const response = existingAssignment.toObject()
            delete response.__v
            delete response.updatedAt
            delete response.createdAt

            return res.status(200).send(success("Docuemnt added successfully.", response))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // get assignment
    async getAssignment(req, res) {
        try {
            const { courseID } = req.params;
            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."));
            }

            const user = req.user;
            const assignment = await assignmentModel.findOne({ courseID: courseID });

            if (!assignment) {
                return res.status(400).send(failure("assignment not found"));
            }

            // Check if the user is a teacher and matches the courseID with coursesTaught
            if (user.role === "teacher") {
                const teacher = await teacherModel.findOne({ email: user.email });
                if (!teacher || !teacher.coursesTaught.includes(courseID)) {
                    return res.status(400).send(failure("You are not authorized to view this assignment."));
                }
            }

            // Check if the user is a student and enrolled in the course
            if (user.role === "student") {
                const student = await studentModel.findOne({ email: user.email });
                if (!student || !student.enrolledCourses.find(course => course._id.toString() === courseID.toString())) {
                    return res.status(400).send(failure("You are not enrolled in this course."));
                }
                const progress = await progressModel.findOne({ studentID: req.user._id });
                if (!progress || progress.percentage < 100) {
                    return res.status(400).send(failure("You have not completed the lessons."));
                }

                const evaluation = await evaluationModel.findOne({ studentID: req.user._id });

                if (!evaluation || !evaluation.isPassedInQuiz) {
                    return res.status(400).send(failure("You have to pass the quiz first since it tests your basics."));
                }
            }

            const response = assignment.toObject();

            delete response._id;
            delete response.__v;
            delete response.updatedAt;
            delete response.createdAt;

            return res.status(200).send(success("assignment fetched successfully", response));
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

    // submit assignment answer
    async submitAssignment(req, res) {
        try {
            const { assignmentID } = req.params;
            const assignmentAnswer = req.file;

            const existingAssignment = await assignmentModel.findOne({ _id: new mongoose.Types.ObjectId(assignmentID) })
                .populate("courseID")

            if (!existingAssignment) {
                return res.status(400).send(failure("The specified assignment does not exist. Please enter a valid assignment."))
            }
            const evaluation = await evaluationModel.findOne({ courseID: existingAssignment.courseID, studentID: req.user._id });

            if (!evaluation || !evaluation.isPassedInQuiz) {
                return res.status(400).send(failure("Pass the quiz first."));
            }

            if (evaluation.assignmentAnswer !== null) {
                return res.status(400).send(failure("You have already provided an answer."))
            }

            // upload file
            const uploadRes = await uploadFile(assignmentAnswer, "assignmentAnswer")

            if (!uploadRes) {
                return res.status(400).send(failure("Error uploading video."))
            }

            evaluation.assignmentAnswer = uploadRes
            await evaluation.save()

            // notify the teacher that a student has submitted an answer

            const teacher = await authModel.findOne({ _id: new mongoose.Types.ObjectId(existingAssignment.courseID.teacherID) });
            console.log("teacher", teacher)

            if (!teacher) {
                return res.status(400).send(failure("The specified teacher does not exist. Please enter a valid teacher."))
            }

            const notification = new notificationModel({
                type: "assignment_Answer",
                to: existingAssignment.courseID.teacherID,
                from: req.user._id,
                courseID: existingAssignment.courseID,
                message: `${req.user.username} has submitted an answer to the assignment for ${existingAssignment.courseID.title}. Evaluate now.`
            })
            await notificationModel.create(notification)

            return res.status(200).send(success("Assignment answer submitted successfully. You can not undo it now. Wait for teacher's evaluation", evaluation.assignmentAnswer));

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

    // evaluate assignment answer
    async evaluateAssignment(req, res) {
        try {
            const { assignmentID, notificationID } = req.params;
            const { assignmentScore } = req.body;

            if (!assignmentID || !notificationID || !assignmentScore) {
                return res.status(400).send(failure("Please provide all required fields."))
            }

            const existingNotification = await notificationModel.findOne({ _id: new mongoose.Types.ObjectId(notificationID) })

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(existingNotification.courseID) })

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified assignment does not exist. Please enter a valid assignment."))
            }

            const existingAssignment = await assignmentModel.findOne({ _id: new mongoose.Types.ObjectId(assignmentID) })
                .populate("courseID")

            if (!existingAssignment) {
                return res.status(400).send(failure("The specified assignment does not exist. Please enter a valid assignment."))
            }

            const existingEvaluation = await evaluationModel.findOne({ courseID: existingAssignment.courseID, studentID: existingNotification.from });

            if (!existingEvaluation) {
                return res.status(400).send(failure("Evaluation not found."))
            }

            if (existingEvaluation.assignmentAnswer === null) {
                return res.status(400).send(failure("No answer found."))
            }
            const teacher = await teacherModel.findOne({ email: req.user.email })

            if (!teacher) {
                return res.status(400).send(failure("User not found"))
            }

            // check if teacher teacher this course
            // const authorizedCourses = teacher.coursesTaught.map(courseId => courseId.toString());

            // if (!authorizedCourses.includes(existingLesson.courseID.toString())) {
            //     return res.status(400).send(failure("You are not authorized to add videos to this lesson."));
            // }

            // add the score to evaluation model

            existingNotification.status = "read"
            await existingNotification.save()
            existingEvaluation.assignmentScore = assignmentScore

            // existingEvaluation.isPassedInAssignment = true
            await existingEvaluation.save()

            // add the course to student's completed course array
            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(existingNotification.from) })
                .populate("studentID")

            if (!student) {
                return res.status(400).send(failure("The specified student does not exist. Please enter a valid student."))
            }

            if (student.studentID.completedCourses.includes(existingCourse._id) && existingNotification.status === "read") {
                return res.status(400).send(failure("Already evaluated."))
            }

            console.log("course id", student.studentID.completedCourses);
            if (existingEvaluation.assignmentScore >= existingAssignment.passMarks) {
                existingEvaluation.isPassedInAssignment = true
                await existingEvaluation.save()
                student.studentID.completedCourses.push(existingCourse._id);
                await student.studentID.save()
            }


            // send notification to student
            const notification = new notificationModel({
                type: "assignment_Evaluation",
                to: existingNotification.from,
                from: req.user._id,
                courseID: existingAssignment.courseID,
                message: `${req.user.username} has evaluated your assignment for ${existingAssignment.courseID.title}.`
            })

            await notificationModel.create(notification)
            return res.status(200).send(success("Assignment evaluation submitted successfully.", existingEvaluation.assignmentScore));

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

    // unsubscribe from course (when student does not pass the course)
    async unsubscribeFromCourse(req, res) {
        try {
            const { courseID } = req.params;

            if (!courseID) {
                return res.status(400).send(failure("Please provide all required fields."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (!student) {
                return res.status(400).send(failure("The specified student does not exist. Please enter a valid student."))
            }

            // pull the course id from enrolledCourses
            student.enrolledCourses.pull(courseID)

            await student.save()

            return res.status(200).send(success("Course unsubscribed successfully."));

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }
}

module.exports = new AssignmentController()