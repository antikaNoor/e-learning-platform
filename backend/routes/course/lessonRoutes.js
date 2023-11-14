const express = require('express')
const routes = express()
const multer = require('multer');
const upload = multer();
const LessonController = require('../../controller/course/lessonController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-lesson/:courseID", isUserLoggedIn, isUserTeacher, upload.array('videos', 5), upload.array('notes', 5), LessonController.createLesson)
routes.post("/delete-lesson", isUserLoggedIn, isUserTeacher, LessonController.deleteLesson)

module.exports = routes 