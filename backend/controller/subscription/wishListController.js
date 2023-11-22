const { success, failure } = require('../../utils/successError')
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const courseModel = require("../../model/courseModel/course")
const wishListModel = require("../../model/subscriptionModel/wishList")
const cartModel = require("../../model/subscriptionModel/cart")

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

            const existingStudent = await studentModel.findOne({ email: req.user.email })

            if (!existingStudent) {
                return res.status(400).send(failure("Student not found."))
            }

            //check if student has this course in cart
            const existingCart = await cartModel.findOne({ studentID: new mongoose.Types.ObjectId(req.user._id), courseID: new mongoose.Types.ObjectId(existingCourse._id) })

            console.log("existingCart", existingCart)
            if (existingCart) {
                return res.status(400).send(failure("Course already added to cart."))
            }

            //check if the student has a wish-list
            const existingWish = await wishListModel.findOne({ studentID: new mongoose.Types.ObjectId(req.user._id) })

            if (!existingWish) {
                // check if student is enrolled in the course
                if (
                    existingStudent.enrolledCourses &&
                    existingStudent.enrolledCourses.length > 0
                ) {
                    if (
                        existingStudent.enrolledCourses.some((course) =>
                            course._id.equals(existingCourse._id)
                        )
                    ) {
                        return res
                            .status(400)
                            .send(failure("You are already enrolled in this course."));
                    }
                }
                // create a new wish-list
                const wishlist = new wishListModel({
                    studentID: new mongoose.Types.ObjectId(req.user._id),
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

            //check if student is enrolled in this course

            if (
                existingStudent.enrolledCourses &&
                existingStudent.enrolledCourses.length > 0
            ) {
                if (
                    existingStudent.enrolledCourses.some((course) =>
                        course._id.equals(existingCourse._id)
                    )
                ) {
                    return res
                        .status(400)
                        .send(failure("You are already enrolled in this course."));
                }
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

    // remove courses from wish-list individually
    async removeFromWishList(req, res) {
        try {
            const { wishlistID, courseID } = req.params

            if (!wishlistID || !courseID) {
                return res.status(400).send(failure("Provide a valid wishlist ID and course ID"))
            }

            const existingWish = await wishListModel.findOne({ _id: new mongoose.Types.ObjectId(wishlistID) })

            if (!existingWish) {
                return res.status(400).send(failure("Wish-list not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (!student) {
                return res.status(400).send(failure("Student not found."))
            }

            if (student._id.toString() !== existingWish.studentID.toString()) {
                return res.status(400).send(failure("You are not authorized to remove this course from wish-list."))
            }

            //check if course exists in wish-list
            const existingCourse = existingWish.courseID.find(course => course.equals(new mongoose.Types.ObjectId(courseID)))

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found in wish-list."))
            }

            existingWish.courseID.pull(courseID)

            // check if the courseID array is empty
            if (existingWish.courseID.length === 0) {
                await wishListModel.deleteOne({ _id: new mongoose.Types.ObjectId(wishlistID) })
                return res.status(200).send(success("Course removed from wish-list successfully."))
            }
            await existingWish.save()

            return res.status(200).send(success("Course removed from wish-list successfully."))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete whole wish-list
    async deleteWishList(req, res) {
        try {
            const { wishlistID } = req.params

            if (!wishlistID) {
                return res.status(400).send(failure("Please enter a valid wishlist id."))
            }

            // first check if there is any document in the wish-list
            const existingWish = await wishListModel.findOne({ _id: new mongoose.Types.ObjectId(wishlistID) })

            if (!existingWish) {
                return res.status(400).send(failure("Wish-list not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (!student) {
                return res.status(400).send(failure("Student not found."))
            }

            if (student._id.toString() !== existingWish.studentID.toString()) {
                return res.status(400).send(failure("You are not authorized to remove this course from wish-list."))
            }

            await wishListModel.deleteOne({ _id: new mongoose.Types.ObjectId(wishlistID) })

            return res.status(200).send(success("Wish-list deleted successfully."))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // get your wishlist
    async getYourWishList(req, res) {
        try {

            const existingWish = await wishListModel.findOne({
                studentID: new mongoose.Types.ObjectId(req.user._id)
            })
                .select("-__v -createdAt -updatedAt")
                .populate('courseID', '-__v -createdAt -updatedAt -isApproved -isDeleted -isPublished');

            if (!existingWish) {
                return res.status(400).send(failure("Wish-list not found."))
            }

            return res.status(200).send(success("Wish-list fetched successfully.", existingWish))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // view all wishlist (this one's for the admin)
    async getAllWishLists(req, res) {
        try {
            // if there is not data in the cart collection, throw error
            const wishListCount = await wishListModel.estimatedDocumentCount()

            if (wishListCount === 0) {
                return res.status(400).send(failure("No wish-list found."))
            }

            const allWishLists = await wishListModel.find().select("-__v -createdAt -updatedAt")

            return res.status(200).send(success("Wish-lists fetched successfully.", allWishLists))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new wishListController()