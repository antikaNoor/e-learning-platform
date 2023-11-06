const express = require('express')
const routes = express()
const CourseApprovalController = require('../../controller/notification/courseApproval')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/publish-course", isUserLoggedIn, isUserTeacher, isUserVerified, CourseApprovalController.publishCourse)
routes.post("/course-approval", isUserLoggedIn, isUserAdmin, isUserVerified, CourseApprovalController.acceptOrRejectCourse)
module.exports = routes 