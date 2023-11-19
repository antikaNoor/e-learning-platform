const express = require('express')
const routes = express()
const CourseController = require('../../controller/course/courseController')
const upload = require("multer")()
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isAdminOrTeacher } = require('../../middleware/auth')
const { courseValidator } = require('../../middleware/validation')
const courseController = require('../../controller/course/courseController')

routes.post("/create-course", isUserLoggedIn, isUserTeacher, upload.single('file'), CourseController.createCourse)
routes.get("/get-courses", CourseController.getCourses)
routes.get("/get-teachers-courses", isUserLoggedIn, isUserTeacher, CourseController.getTeachersCourses)
routes.post("/delete-course", isUserLoggedIn, isUserTeacher, CourseController.deleteCourse)
routes.delete("/delete-file", CourseController.handleDeleteFile)

module.exports = routes 