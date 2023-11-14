const express = require('express')
const routes = express()
const upload = require("multer")()
const AssignmentController = require('../../controller/course/assignmentController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-assignment/:courseID", isUserLoggedIn, isUserTeacher, AssignmentController.createAssignment)
routes.post("/upload-assignment-document/:assignmentID", isUserLoggedIn, isUserTeacher, upload.single('documents'), AssignmentController.addDocuments)
routes.get("/get-assignment/:courseID", isUserLoggedIn, AssignmentController.getAssignment)
routes.post("/submit-assignment/:assignmentID", isUserLoggedIn, isUserStudent, upload.single('assignmentAnswer'), AssignmentController.submitAssignment)
routes.post("/evaluate-assignment/:assignmentID/:notificationID", isUserLoggedIn, isUserTeacher, AssignmentController.evaluateAssignment)

module.exports = routes 