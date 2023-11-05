const { success, failure } = require('../../utils/successError')
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const authModel = require('../../model/authModel/auth')
const courseModel = require('../../model/courseModel/course')
const cartModel = require('../../model/subscriptionModel/cart')

class CartController {
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

    // add to cart
    async addToCart(req, res) {
        try {
            const { studentID, courseID } = req.body
            if (!studentID || !courseID) {
                return res.status(400).send(failure("Please enter all the fields."))
            }

            const existingStudent = await authModel.findOne({ _id: new mongoose.Types.ObjectId(studentID) })
            if (!existingStudent) {
                return res.status(400).send(failure("Student not found"))
            }

            if (existingStudent.role !== "student") {
                return res.status(400).send(failure("User is not a student"))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("Course not found"))
            }

            let existingCart = await cartModel.findOne({ studentID: new mongoose.Types.ObjectId(studentID) })

            if (!existingCart) {
                existingCart = await cartModel.create({
                    studentID: new mongoose.Types.ObjectId(studentID),
                    courseID: [new mongoose.Types.ObjectId(courseID)],
                })
                return res.status(200).send(success("Course added to cart successfully"))
            }

            if (existingCart.courseID.includes(new mongoose.Types.ObjectId(courseID))) {
                return res.status(400).send(failure("Course already added to cart"))
            }

            existingCart.courseID.push(new mongoose.Types.ObjectId(courseID))

            await existingCart.save()
            return res.status(200).send(success("Course added to cart successfully"))
        } catch (error) {
            console.log("error", error)
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // remove from cart
    async removeFromCart(req, res) {
        try {
            const { studentID, courseID } = req.body
            if (!studentID || !courseID) {
                return res.status(400).send(failure("Please enter all the fields."))
            }

            const existingStudent = await authModel.findOne({ _id: new mongoose.Types.ObjectId(studentID) })

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found"))
            }

            if (existingStudent.role !== "student") {
                return res.status(400).send(failure("User is not a student"))
            }

            const existingCourse = await courseModel.findOne({ _id: new mongoose.Types.ObjectId(courseID) })

            if (!existingCourse || existingCourse.isDeleted === true) {
                return res.status(400).send(failure("Course not found"))
            }

            let existingCart = await cartModel.findOne({ studentID: new mongoose.Types.ObjectId(studentID) })

            if (!existingCart) {
                return res.status(400).send(failure("Cart not found"))
            }

            if (!existingCart.courseID.includes(new mongoose.Types.ObjectId(courseID))) {
                return res.status(400).send(failure("Course not found in cart"))
            }

            existingCart.courseID.pull(new mongoose.Types.ObjectId(courseID))

            // if there is only one course in the courseID array and it has to be removed, then delete the cart
            if (existingCart.courseID.length === 0) {
                await existingCart.remove()
                return res.status(200).send(success("Course removed from cart successfully"))
            }

            await existingCart.save()
            return res.status(200).send(success("Course removed from cart successfully"))
        } catch (error) {
            console.log("error has occured")
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new CartController()