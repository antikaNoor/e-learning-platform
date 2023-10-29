const express = require('express')
const routes = express()
const LessonController = require('../controller/lessonController')

routes.post("/create-lesson", LessonController.createLesson)
routes.post("/delete-lesson", LessonController.deleteLesson)

module.exports = routes 