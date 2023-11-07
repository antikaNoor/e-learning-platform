const express = require('express')
const routes = express()
const TeacherApprovalController = require('../../controller/notification/teacherInfoController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/teacher-request", isUserLoggedIn, isUserTeacher, isUserVerified, TeacherApprovalController.addTeacherInfo)
routes.post("/teacher-approval", isUserLoggedIn, isUserAdmin, isUserVerified, TeacherApprovalController.acceptOrRejectTeacher)
module.exports = routes 