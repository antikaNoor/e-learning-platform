const express = require('express')
const routes = express()
const CourseController = require('../../controller/course/courseController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isAdminOrTeacher } = require('../../middleware/auth')
const { courseValidator } = require('../../middleware/validation')
const courseController = require('../../controller/course/courseController')

routes.post("/create-course", isUserLoggedIn, isUserTeacher, courseValidator.addCourse, courseController.createValiadtion, CourseController.createCourse)
routes.get("/get-courses", CourseController.getCourses)
routes.post("/delete-course", isUserLoggedIn, isUserTeacher, CourseController.deleteCourse)

module.exports = routes 