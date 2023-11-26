const express = require('express')
const routes = express()
const ForumController = require('../../controller/studentSupport/forumController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-question/:courseID", isUserLoggedIn, isUserStudent, ForumController.postQuestion)
routes.post("/post-answer/:forumID", isUserLoggedIn, ForumController.postAnswer)
routes.get("/get-forum/:courseID", ForumController.getForumForCourse)

module.exports = routes 