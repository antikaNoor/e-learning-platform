const express = require('express')
const routes = express()
const CourseController = require('../../controller/course/courseController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/create-course", isUserLoggedIn, isUserTeacher, isUserVerified, CourseController.createCourse)
routes.get("/get-courses", CourseController.getCourses)
routes.post("/delete-course", isUserLoggedIn, isUserTeacher, isUserVerified, CourseController.deleteCourse)
routes.post("/publish-course", isUserLoggedIn, isUserTeacher, isUserVerified, CourseController.publishCourse)

module.exports = routes 