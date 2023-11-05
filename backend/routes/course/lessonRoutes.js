const express = require('express')
const routes = express()
const upload = require("multer")()
const LessonController = require('../../controller/course/lessonController')

routes.post("/create-lesson", upload.single('file'), LessonController.createLesson)
routes.post("/delete-lesson", LessonController.deleteLesson)

module.exports = routes 