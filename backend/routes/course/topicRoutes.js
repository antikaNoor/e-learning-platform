const express = require('express')
const routes = express()
const TopicController = require('../../controller/course/topicController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')
const { topicValidator } = require('../../middleware/validation')

routes.post("/create-topic", isUserLoggedIn, isUserAdmin, topicValidator.addTopic, TopicController.createValidation, TopicController.createTopic)
routes.delete("/delete-topic/:topicID", isUserLoggedIn, isUserAdmin, TopicController.deleteTopic)
routes.patch("/edit-topic/:topicID", isUserLoggedIn, isUserAdmin, TopicController.editTopic)
routes.get("/get-all-topics", TopicController.getTopics)
routes.get("/get-courses-under-topic/:topicID", TopicController.getCoursesUnderTopic)

module.exports = routes 