const express = require('express')
const routes = express()
const TopicController = require('../../controller/course/topicController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/create-topic", isUserLoggedIn, isUserAdmin, isUserVerified, TopicController.createTopic)
routes.post("/delete-topic", isUserLoggedIn, isUserAdmin, isUserVerified, TopicController.deleteTopic)

module.exports = routes 