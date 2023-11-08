const express = require('express')
const routes = express()
const TopicController = require('../../controller/course/topicController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-topic", isUserLoggedIn, isUserAdmin, TopicController.createTopic)
routes.post("/delete-topic", isUserLoggedIn, isUserAdmin, TopicController.deleteTopic)

module.exports = routes 