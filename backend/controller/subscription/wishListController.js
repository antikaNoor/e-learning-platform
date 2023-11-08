const { success, failure } = require('../../utils/successError')
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const courseModel = require("../../model/courseModel/course")
const wishListModel = require("../../model/subscriptionModel/wishList")

class wishListController {

    // validation
    async create(req, res, next) {
        try {
            const validation = validationResult(req).array()
            if (validation.length > 0) {
                return res.status(422).send({ message: "validation error", validation })
            }
            next()
        } catch (error) {
            console.log("error has occured")
        }
    }

    //add to wish-list
    async addToWishList(req, res) {
        try {
            const { courseID } = req.body

            if (!courseID) {
                return res.status(400).send(failure("Provide a valid course ID"))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse || existingCourse.isApproved === false) {
                return res.status(400).send(failure("Course not found."))
            }

            const studentID = req.user._id

            const student = await authModel.findOne({ _id: studentID })

            if (!student) {
                return res.status(400).send(failure("Student not found."))
            }

            const existingStudent = await studentModel.findOne({ email: student.email })

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found."))
            }

            //check if the student has a wish-list
            const existingWish = await wishListModel.findOne({ studentID: new mongoose.Types.ObjectId(studentID) })

            if (!existingWish) {
                // create a new wish-list
                const wishlist = new wishListModel({
                    studentID: new mongoose.Types.ObjectId(studentID),
                    courseID: [existingCourse._id]
                })
                await wishlist.save()
                return res.status(200).send(success("Course added to wish-list successfully."))
            }

            // check if the course is already added to the wish-list
            const existingCourseInWish = existingWish.courseID.find(course => course.equals(existingCourse._id))

            if (existingCourseInWish) {
                return res.status(400).send(failure("Course already added to wish-list."))
            }

            // if there is already a wish-list against the student, just push into the array
            existingWish.courseID.push(existingCourse._id)
            await existingWish.save()

            return res.status(200).send(success("Course added to wish-list successfully."))


        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new wishListController()