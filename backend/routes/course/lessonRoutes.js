const express = require('express')
const routes = express()
const upload = require("multer")()
const LessonController = require('../../controller/course/lessonController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-lesson", isUserLoggedIn, isUserTeacher, upload.single('file'), LessonController.createLesson)
routes.post("/delete-lesson", isUserLoggedIn, isUserTeacher, LessonController.deleteLesson)

module.exports = routes 