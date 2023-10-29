const express = require('express')
const routes = express()
const CourseController = require('../controller/courseController')

routes.post("/create-course", CourseController.createCourse)
routes.post("/delete-course", CourseController.deleteCourse)

module.exports = routes 