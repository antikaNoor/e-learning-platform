const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const teacherModel = require("../../model/authModel/teacher")
const courseModel = require("../../model/courseModel/course")
const quizModel = require("../../model/courseModel/quiz")

const { success, failure } = require("../../utils/successError")
const express = require('express')
const mongoose = require("mongoose")
const { validationResult } = require('express-validator')
const { uploadFile, deleteFile, deleteFolder } = require("../../config/files")
// const fileTypes = require("../constants/fileTypes")
const fs = require('fs')
const path = require('path')

let endQuizTime = null

class QuizController {
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

    // add quiz
    async createQuiz(req, res) {
        try {
            const { courseID, questions, duration } = req.body

            if (!courseID || !questions || !duration) {
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
            const authorizedCourses = teacher.coursesTaught.map(courseId => courseId.toString());

            if (!authorizedCourses.includes(courseID.toString())) {
                return res.status(400).send(failure("You are not authorized to post an answer to this forum."));
            }

            // if there is a quiz against the course, throw error
            const existingQuiz = await quizModel.findOne({ courseID })

            if (existingQuiz) {
                return res.status(400).send(failure("Quiz already exists for this course"))
            }

            const quiz = await quizModel.create({
                courseID,
                questions,
                duration
            })

            await quiz.save()

            // calculate total marks counting how many questions are there
            const totalMarks = questions.length
            // calculate pass marks 30% of total marks
            const passMarks = totalMarks * 0.3

            // enter into database
            quiz.totalMarks = totalMarks
            quiz.passMarks = passMarks

            await quiz.save()

            const response = quiz.toObject()
            delete response.__v
            delete response.updatedAt
            delete response.createdAt

            return res.status(200).send(success("Quiz added successfully", response))

        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // get quiz
    async getQuiz(req, res) {
        try {
            const { courseID } = req.params;
            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) });

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("The specified course does not exist. Please enter a valid course."));
            }

            const user = req.user;
            const quiz = await quizModel.findOne({ courseID: courseID });

            if (!quiz) {
                return res.status(400).send(failure("Quiz not found"));
            }

            // Check if the user is a teacher and matches the courseID with coursesTaught
            if (user.role === "teacher") {
                const teacher = await teacherModel.findOne({ email: user.email });
                if (!teacher || !teacher.coursesTaught.includes(courseID)) {
                    return res.status(400).send(failure("You are not authorized to view this quiz."));
                }
            }

            // Check if the user is a student and enrolled in the course
            if (user.role === "student") {
                const student = await studentModel.findOne({ email: user.email });
                if (!student || !student.enrolledCourses.find(course => course._id.toString() === courseID.toString())) {
                    return res.status(400).send(failure("You are not enrolled in this course."));
                }
            }

            const response = quiz.toObject();

            // Remove the correctOption property from each question if user is a student
            if (user.role === "student" && response.questions && response.questions.length > 0) {
                response.questions = response.questions.map(({ correctOption, ...rest }) => rest);
            }

            delete response._id;
            delete response.__v;
            delete response.updatedAt;
            delete response.createdAt;

            return res.status(200).send(success("Quiz fetched successfully", response));
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

    //start quiz countdown
    async startQuizCountdown(req, res) {
        try {
            const { quizID } = req.params;
            const existingQuiz = await quizModel.findOne({ _id: new mongoose.Types.ObjectId(quizID) });

            if (!existingQuiz) {
                return res.status(400).send(failure("Quiz not found"));
            }

            // store the exact time of hitting this api
            const time = Date.now();

            // add this time with duration
            endQuizTime = time + existingQuiz.duration * 60 * 1000;

            const formattedEndTime = new Date(endQuizTime).toLocaleString();

            return res.status(200).send(success("Quiz countdown started successfully", {
                time: formattedEndTime
            }))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }

    // Submiting a quiz
    async submitQuiz(req, res) {
        try {
            // const { quizID } = req.params;
            const { quizID, answer } = req.body;
            const existingQuiz = await quizModel.findOne({ _id: new mongoose.Types.ObjectId(quizID) });

            if (!existingQuiz) {
                return res.status(400).send(failure("Quiz not found"));
            }

            if (Date.now() > endQuizTime) {
                return res.status(400).send(failure("Sorry, time's up!"));
            }

            // calculate student's mark and enter into evaluation model

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"));
        }
    }
}

module.exports = new QuizController()