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

class CartController {

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

    //add to cart
    async addToCart(req, res) {
        try {
            const { courseID } = req.body
            console.log("courseID", req.body)

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

            //check if the student has a cart
            const existingCart = await cartModel.findOne({ studentID: new mongoose.Types.ObjectId(req.user._id) })
            const existingWish = await wishListModel.findOne({ studentID: new mongoose.Types.ObjectId(req.user._id) });

            if (!existingCart) {
                // create a new cart
                const cart = new cartModel({
                    studentID: new mongoose.Types.ObjectId(req.user._id),
                    courseID: [existingCourse._id]
                })
                await cart.save()

                if (existingWish) {
                    // Use equals for ObjectId comparison
                    existingWish.courseID = existingWish.courseID.filter(course => !course.equals(courseID));

                    // Check if the courseID array is empty
                    if (existingWish.courseID.length === 0) {
                        await wishListModel.deleteOne({ studentID: new mongoose.Types.ObjectId(req.user._id) });
                    } else {
                        await existingWish.save();
                    }
                }
                return res.status(200).send(success("Course added to cart successfully.", cart))
            }

            // check if the course is already added to the cart
            const existingCourseInCart = existingCart.courseID.find(course => course.equals(existingCourse._id))

            if (existingCourseInCart) {
                return res.status(400).send(failure("Course already added to cart."))
            }

            if (existingWish) {
                // Use equals for ObjectId comparison
                existingWish.courseID = existingWish.courseID.filter(course => !course.equals(courseID));

                // Check if the courseID array is empty
                if (existingWish.courseID.length === 0) {
                    await wishListModel.deleteOne({ studentID: new mongoose.Types.ObjectId(req.user._id) });
                } else {
                    await existingWish.save();
                }
            }

            //check if student is enrolled in this course
            const enrolledCourse = existingStudent.enrolledCourses.find(course => course._id.equals(existingCourse._id))

            if (enrolledCourse) {
                return res.status(400).send(failure("You are already enrolled in this course."))
            }



            // if there is already a cart against the student, just push into the array
            existingCart.courseID.push(existingCourse._id)
            await existingCart.save()

            return res.status(200).send(success("Course added to cart successfully."))


        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // remove courses from cart individually
    async removeFromCart(req, res) {
        try {
            const { cartID, courseID } = req.params

            if (!cartID || !courseID) {
                return res.status(400).send(failure("Provide a valid cart ID and course ID"))
            }

            const existingCart = await cartModel.findOne({ _id: new mongoose.Types.ObjectId(cartID) })

            if (!existingCart) {
                return res.status(400).send(failure("cart not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (!student) {
                return res.status(400).send(failure("Student not found."))
            }

            if (student._id.toString() !== existingCart.studentID.toString()) {
                return res.status(400).send(failure("You are not authorized to remove this course from cart."))
            }

            //check if course exists in cart
            const existingCourse = existingCart.courseID.find(course => course.equals(new mongoose.Types.ObjectId(courseID)))

            if (!existingCourse) {
                return res.status(400).send(failure("Course not found in cart."))
            }

            existingCart.courseID.pull(courseID)

            // check if the courseID array is empty
            if (existingCart.courseID.length === 0) {
                await cartModel.deleteOne({ _id: new mongoose.Types.ObjectId(cartID) })
                return res.status(200).send(success("Course removed from cart successfully."))
            }
            await existingCart.save()

            return res.status(200).send(success("Course removed from cart successfully."))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // delete whole cart
    async deleteCart(req, res) {
        try {
            const { cartID } = req.params

            if (!cartID) {
                return res.status(400).send(failure("Please enter a valid cart id."))
            }

            // first check if there is any document in the cart
            const existingCart = await cartModel.findOne({ _id: new mongoose.Types.ObjectId(cartID) })

            if (!existingCart) {
                return res.status(400).send(failure("cart not found."))
            }

            const student = await authModel.findOne({ _id: new mongoose.Types.ObjectId(req.user._id) })

            if (!student) {
                return res.status(400).send(failure("Student not found."))
            }

            if (student._id.toString() !== existingCart.studentID.toString()) {
                return res.status(400).send(failure("You are not authorized to remove this course from cart."))
            }

            await cartModel.deleteOne({ _id: new mongoose.Types.ObjectId(cartID) })

            return res.status(200).send(success("cart deleted successfully."))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // get your cart
    async getYourCart(req, res) {
        try {

            const existingCart = await cartModel.findOne({
                studentID: new mongoose.Types.ObjectId(req.user._id)
            })
                .select("-__v -createdAt -updatedAt")
                .populate('courseID', '-__v -createdAt -updatedAt -isApproved -isDeleted -isPublished');

            if (!existingCart) {
                return res.status(400).send(failure("Cart not found."))
            }

            return res.status(200).send(success("Cart fetched successfully.", existingCart))

        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // view all carts (this one's for the admin)
    async getAllCarts(req, res) {
        try {
            // if there is not data in the cart collection, throw error
            const cartCount = await cartModel.estimatedDocumentCount()

            if (cartCount === 0) {
                return res.status(400).send(failure("No carts found."))
            }

            const allCarts = await cartModel.find().select("-__v -createdAt -updatedAt")

            return res.status(200).send(success("Carts fetched successfully.", allCarts))
        } catch (error) {
            console.error("Error", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new CartController()