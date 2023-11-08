const express = require('express')
const routes = express()
const ForumController = require('../../controller/studentSupport/forumController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-question", isUserLoggedIn, isUserStudent, ForumController.postQuestion)
routes.post("/post-answer", isUserLoggedIn, ForumController.postAnswer)

module.exports = routes 