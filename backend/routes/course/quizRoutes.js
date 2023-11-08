const express = require('express')
const routes = express()
const QuizController = require('../../controller/course/quizController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-quiz", isUserLoggedIn, isUserTeacher, QuizController.createQuiz)
routes.get("/get-quiz/:courseID", isUserLoggedIn, QuizController.getQuiz)
routes.get("/quiz-countdown/:quizID", isUserLoggedIn, isUserStudent, QuizController.startQuizCountdown)

module.exports = routes 