const express = require('express')
const routes = express()
const upload = require("multer")()
const AssignmentController = require('../../controller/course/assignmentController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-assignment", isUserLoggedIn, isUserTeacher, upload.single('document'), AssignmentController.createAssignment)

module.exports = routes 