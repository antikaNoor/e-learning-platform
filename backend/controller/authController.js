const authModel = require("../model/auth")
const userModel = require("../model/user")
const { success, failure } = require("../utils/successError")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
const { validationResult } = require("express-validator")

class AuthController {
    // validation
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

    // sign up
    async signUp(req, res) {
        try {
            const { username, email, password } = req.body
            console.log("username", username)
            const user = await authModel.findOne({ email })
            if (user) {
                return res.status(400).send({ message: "user already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const authUser = await authModel.create({
                username,
                email,
                password: hashedPassword
            })

            const userInfo = await userModel.create({
                username,
                email,
                role: "student",
            })

            const responseAuth = authUser.toObject()

            delete responseAuth.password
            delete responseAuth.loginAttempt
            delete responseAuth.user
            delete responseAuth.__v
            delete responseAuth.createdAt
            delete responseAuth.updatedAt

            return res.status(200).send(success("Successfully added the user", responseAuth))

        } catch (error) {
            console.log(error)
            return res.status(500).send(failure("Internal server error", error))
        }
    }

    // verify email 
    async verifyEmail(req, res) {
        try {
            const { email, token } = req.body

            const user = await authModel.findOne({ email })

            if (!user) {
                return res.status(400).send({ message: "user does not exist" })
            }

            if (user.isVerified) {
                return res.status(400).send({ message: "user already verified" })
            }


        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AuthController()