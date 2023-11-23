const express = require('express')
const routes = express()
const AuthController = require('../../controller/auth/authController')
const { authValidator, reviewValidator } = require('../../middleware/validation')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/signup", authValidator.signup, AuthController.createValiadtion, AuthController.signUp)
routes.post("/resend-verification-email", AuthController.resendVerificationEmail)
routes.get("/verify-email/:userId/:token", AuthController.verifyEmail)

routes.post("/login", AuthController.login)

routes.post("/forgot-password", AuthController.sendForgotPasswordEmail)
routes.post("/reset-password/:userId/:token", AuthController.resetPassword)
routes.get("/validate-reset-request/:userId/:token", AuthController.validatePasswordResetRequest);

routes.get("/is-teacher-approved", isUserLoggedIn, AuthController.isTeacherApproved);


module.exports = routes 