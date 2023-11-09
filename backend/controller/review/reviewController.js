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

    //add review (optional) and rating
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
                text: text || null
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

    // edit a review
    async editReview(req, res) {
        try {
            const { reviewID } = req.params
            const { rating, text } = req.body

            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."))
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (student._id.toString() !== existingReview.userID.toString()) {
                return res.status(400).send(failure("You are not authorized to edit this review."))
            }

            await reviewModel.updateOne({ _id: new mongoose.Types.ObjectId(reviewID) }, { rating, text })

            return res.status(200).send(success("Review edited successfully."))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    // delete review and rating
    async deleteReview(req, res) {
        try {
            const { reviewID } = req.params

            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."))
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (student._id.toString() !== existingReview.userID.toString()) {
                return res.status(400).send(failure("You are not authorized to delete this review."))
            }

            await reviewModel.deleteOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            return res.status(200).send(success("Review deleted successfully."))
        } catch (error) {
            console.error("Error while deleting review:", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

    // delete review text but keep the rating
    async deleteReviewText(req, res) {
        try {
            const { reviewID } = req.params
            if (!reviewID) {
                return res.status(400).send(failure("Please enter a valid review id."))
            }

            const existingReview = await reviewModel.findOne({ _id: new mongoose.Types.ObjectId(reviewID) })

            if (!existingReview) {
                return res.status(400).send(failure("Review not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (student._id.toString() !== existingReview.userID.toString()) {
                return res.status(400).send(failure("You are not authorized to delete this review."))
            }

            if (existingReview.text === null) {
                return res.status(400).send(failure("Review text is already deleted."))
            }

            existingReview.text = null
            await existingReview.save()

            return res.status(200).send(success("Review text deleted successfully."))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("internal server error."))
        }
    }

}

module.exports = new reviewClass()