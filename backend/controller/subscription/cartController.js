const { success, failure } = require('../../utils/successError')
const express = require('express')
const { validationResult } = require('express-validator')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const authModel = require("../../model/authModel/auth")
const studentModel = require("../../model/authModel/student")
const courseModel = require("../../model/courseModel/course")
const cartModel = require("../../model/subscriptionModel/cart")

class cartController {

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

            //check if the student has a cart
            const existingCart = await cartModel.findOne({ studentID: new mongoose.Types.ObjectId(studentID) })

            if (!existingCart) {
                // create a new cart
                const cart = new cartModel({
                    studentID: new mongoose.Types.ObjectId(studentID),
                    courseID: [existingCourse._id]
                })
                await cart.save()
                return res.status(200).send(success("Course added to cart successfully."))
            }

            // check if the course is already added to the cart
            const existingCourseInCart = existingCart.courseID.find(course => course.equals(existingCourse._id))

            if (existingCourseInCart) {
                return res.status(400).send(failure("Course already added to cart."))
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

    async delete(req, res) {
        try {
            const { reader, bought_books } = req.body
            if (!reader || !bought_books) {
                return res.status(500).send(failure("Provide reader id and book id"))
            }

            if (bought_books.amount === 0) {
                return res.status(500).send(failure("Amount cannot be 0."))
            }

            let totalSpent = 0
            let existingTransaction = await cartModel.findOne({ reader });

            if (existingTransaction) {
                let existingBookEntryIndex = -1
                existingTransaction.bought_books.map(
                    (entry, i) => {
                        if (String(entry.id) === req.body.bought_books.id) {
                            existingBookEntryIndex = i
                        }
                    }
                );

                if (existingBookEntryIndex >= 0) {
                    //increase quantity
                    console.log("increase quantity")

                    let quantity_ = existingTransaction.bought_books[existingBookEntryIndex].quantity
                    console.log(quantity_)

                    // if delete amount is more than quantity, it will throw error
                    if (bought_books.amount > quantity_) {
                        return res.status(400).send(failure("Delete amount cannot be more than quantity."));
                    }

                    quantity_ -= bought_books.amount
                    existingTransaction.bought_books[existingBookEntryIndex].quantity = quantity_

                    // if quantity is 0 but bought_book length is not, i am removing the object from the array
                    if (quantity_ === 0) {
                        existingTransaction.bought_books.splice(existingBookEntryIndex, 1);
                        await existingTransaction.save()
                    }
                }
                else {
                    console.log("entering new book for existing user")
                    existingTransaction.bought_books.push({ id: new mongoose.Types.ObjectId(bought_books.id) })
                }
            }
            else {
                existingTransaction = new cartModel({ reader, bought_books })
            }

            // Calculate the total spent for this transaction
            for (const book of existingTransaction.bought_books) {
                const bookData = await bookModel.findById(book.id);
                if (!bookData) {
                    return res.status(400).send(failure("Book with ID ${book.title} not found"));
                }

                totalSpent += bookData.price * book.quantity;
            }

            // Update the total_spent field
            existingTransaction.total_spent = totalSpent;

            await existingTransaction.save();

            const responseCart = existingTransaction.toObject()

            delete responseCart._id
            delete responseCart.__v

            return res.status(200).send(success("Successfully deleted from cart", responseCart))
        } catch (error) {
            console.error("Error while deleting transaction:", error);
            return res.status(500).send(failure("Internal server error"))
        }
    }

    //get the reader's cart
    async showCart(req, res) {
        try {
            const { authorization } = req.headers

            const token = authorization.split(' ')[1]
            const decodedToken = jwt.decode(token, { complete: true })

            const readerIdFromToken = decodedToken.payload.reader_name

            const existingReader = await readerModel.findOne({ reader_name: readerIdFromToken })
            const existingCart = await cartModel.findOne({ reader: existingReader._id })
                .populate("bought_books.id")

            if (!existingCart) {
                return res.status(400).send(failure("This cart does not exist."))
            }
            const responseCart = existingCart.toObject()

            delete responseCart.__v
            return res.status(200).send(success("Got the data from the cart", responseCart))


        } catch (error) {
            console.log("error found", error)
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(500).send(failure("Token is invalid", error))
            }
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(500).send(failure("Token is expired", error))
            }
            res.status(500).send(failure("Internal server error"))
        }
    }

    // checkout
    async checkOut(req, res) {
        try {
            const { cart } = req.body
            const { authorization } = req.headers

            const token = authorization.split(' ')[1]
            const decodedToken = jwt.decode(token, { complete: true })

            const readerIdFromToken = decodedToken.payload.reader_name

            const existingReader = await readerModel.findOne({ reader_name: readerIdFromToken })
            const existingEntity = await cartModel.findOne({ reader: existingReader._id })

            if (!existingEntity || !existingEntity.reader) {
                return res.status(400).send(failure("Unauthorized reader"))
            }

            // if there is nothing in the body
            if (!cart) {
                return res.status(400).send(failure("Provide a cart id"))
            }

            let existingCart = await cartModel.findById(new mongoose.Types.ObjectId(cart))

            if (existingEntity.reader.toString() !== existingCart.reader.toString()) {
                return res.status(400).send(failure("Unauthorized reader"))
            }
            if (existingCart) {
                // cart exists but the array is empty
                if (existingCart.bought_books.length === 0) {
                    return res.status(400).send(failure("Cart does not exist."))
                }

                // Calculate the price for this transaction
                for (const book of existingCart.bought_books) {
                    const bookData = await bookModel.findById(book.id);
                    if (!bookData) {
                        return res.status(400).send(failure("Book not found"));
                    }

                    let updateStock = bookData.stock

                    if (updateStock - book.quantity < 0) {
                        return res.status(400).send(failure("Sorry, low stock!"));
                    }
                    bookData.stock -= book.quantity

                    await bookData.save();
                }
                const totalSpent = existingCart.total_spent
                const reader = existingCart.reader


                const existingReader = await readerModel.findOne(reader)
                console.log(existingCart.total_spent)
                // updating reader's balance from the reader schema
                if (existingCart.total_spent >= existingReader.balance) {
                    return res.status(400).send(failure("Sorry, low balance! Try updating your balance."));
                }
                existingReader.balance -= existingCart.total_spent
                existingReader.save()

                // adding to the order schema
                const orderInfo = await orderModel.create({
                    cart: cart,
                    reader: reader,
                    total_spent: totalSpent,
                    bought_books: existingCart.bought_books
                })

                // deleting the cart from cart schema
                await cartModel.findOneAndDelete(new mongoose.Types.ObjectId(cart))

                const responseCart = existingCart.toObject()

                delete responseCart._id
                delete responseCart.__v

                return res.status(200).send(success("Successfully checked out from cart", responseCart))
            }
            else {
                return res.status(400).send(failure("cart does not exist"))
            }

        } catch (error) {
            console.error("Error while checking out:", error);
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(500).send(failure("Token is invalid", error))
            }
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(500).send(failure("Token is expired", error))
            }
            return res.status(500).send(failure("Internal server error"))
        }
    }

    //show reader's transactions
    async showTransaction(req, res) {
        try {
            const { authorization } = req.headers

            const token = authorization.split(' ')[1]
            const decodedToken = jwt.decode(token, { complete: true })

            const readerIdFromToken = decodedToken.payload.reader_name

            const existingReader = await readerModel.findOne({ reader_name: readerIdFromToken })
            const existingTransaction = await orderModel.find({ reader: existingReader._id })
                .populate("bought_books.id")

            if (!existingTransaction) {
                return res.status(400).send(failure("The reader has not made any transactions."))
            }
            console.log(existingTransaction)
            // const responseCart = existingTransaction.toObject()

            // delete responseCart._id
            // delete responseCart.__v
            return res.status(200).send(success("Got the data from transaction.", existingTransaction))


        } catch (error) {
            console.log("error found", error)
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(500).send(failure("Token is invalid", error))
            }
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(500).send(failure("Token is expired", error))
            }
            return res.status(500).send(failure("Internal server error"))
        }
    }

    //get all data
    async getAllTransactions(req, res) {
        try {
            const result = await orderModel.find({})
                .populate({
                    path: 'reader',
                    select: 'reader_name reader_email', // Select the fields you want to populate for the reader
                })
                .populate({
                    path: 'bought_books.id',
                    select: 'title author genre image', // Select the fields you want to populate for the bought books
                })
                .select("-_id -__v")

            if (result.length > 0) {
                return res
                    .status(200)
                    .send(success("Successfully received all transactions", result));
            }
            return res.status(400).send(failure("No transactions were found"));

        } catch (error) {
            return res.status(500).send(failure("Internal server error"))
        }
    }

    // get all carts
    async getAllCarts(req, res) {
        try {
            const result = await cartModel.find({})
                .select("-_id -__v")
            if (result.length > 0) {
                return res
                    .status(200)
                    .send(success("Successfully received all transactions", result));
            }
            return res.status(400).send(success("No cart was found"));

        } catch (error) {
            return res.status(500).send(failure("Internal server error"))
        }
    }
}

module.exports = new cartController()