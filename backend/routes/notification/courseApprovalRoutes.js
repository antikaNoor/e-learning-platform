const express = require('express')
const routes = express()
const NotificationController = require('../../controller/notification/courseApproval')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/publish-course", isUserLoggedIn, isUserTeacher, isUserVerified, NotificationController.publishCourse)
routes.post("/course-approval", isUserLoggedIn, isUserAdmin, isUserVerified, NotificationController.acceptOrRejectCourse)
module.exports = routes 