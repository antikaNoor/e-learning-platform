const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const courseModel = require("../../model/courseModel/course")
const reviewModel = require("../../model/reviewModel/review")

const { success, failure } = require("../../utils/successError")
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

class reviewClass {

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

    //add data
    async addReview(req, res) {
        try {
            const { courseID, rating, text } = req.body

            if (!courseID || !rating) {
                return res.status(400).send(failure("Please enter a valid course id and rating."))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found."))
            }

            const user = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (!user || user.role !== "student") {
                return res.status(400).send(failure("Student not found."))
            }

            // check if student is enrolled in the course
            const student = await studentModel.findOne({ email: user.email })

            if (!student) {
                return res.status(400).send(failure("Student not found."))
            }

            const enrolledCourse = student.enrolledCourses.find(course => course._id.toString() === courseID)

            if (!enrolledCourse) {
                return res.status(400).send(failure("You are not enrolled in this course."))
            }

            // check if student has already given the review
            const existingReview = await reviewModel.findOne({ courseID, userID: user._id })

            if (existingReview) {
                return res.status(400).send(failure("You have already given a review for this course. You can edit it."))
            }

            const review = new reviewModel({
                courseID,
                userID: user._id,
                rating,
                text
            })

            await review.save()

            const response = review.toObject()
            delete response.__v
            delete response.updatedAt
            delete response.createdAt

            return res.status(200).send(success("Review added successfully.", response))

        } catch (error) {
            console.error("Error while entering review:", error);
            return res.status(500).send(failure("internal server error."))
        }
    }
}

module.exports = new reviewClass()