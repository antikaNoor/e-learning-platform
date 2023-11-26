const express = require('express')
const routes = express()
const upload = require("multer")()
const AssignmentController = require('../../controller/course/assignmentController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-assignment/:courseID", isUserLoggedIn, isUserTeacher, AssignmentController.createAssignment)
routes.post("/upload-docs/:assignmentID", isUserLoggedIn, isUserTeacher, upload.single('documents'), AssignmentController.addDocs)
routes.get("/get-assignment/:courseID", isUserLoggedIn, AssignmentController.getAssignmentForCourse)


module.exports = routes 