const express = require('express')
const routes = express()
const CourseController = require('../../controller/course/courseController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-course", isUserLoggedIn, isUserTeacher, CourseController.createCourse)
routes.get("/get-courses", CourseController.getCourses)
routes.post("/delete-course", isUserLoggedIn, isUserTeacher, CourseController.deleteCourse)
routes.post("/publish-course", isUserLoggedIn, isUserTeacher, CourseController.publishCourse)

module.exports = routes 