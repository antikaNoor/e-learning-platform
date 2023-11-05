const express = require('express')
const routes = express()
const AuthController = require('../../controller/auth/authController')
const authValidator = require('../../middleware/validation')

routes.post("/signup", authValidator.signup, AuthController.createValiadtion, AuthController.signUp)
routes.post("/resend-verification-email", AuthController.resendVerificationEmail)
routes.get("/verify-email/:userId/:token", AuthController.verifyEmail)

routes.post("/login", AuthController.login)

routes.post("/forgot-password", AuthController.sendForgotPasswordEmail)
routes.post("/reset-password/:userId/:token", AuthController.resetPassword)

module.exports = routes 