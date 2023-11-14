const express = require('express')
const routes = express()
const QuizController = require('../../controller/course/quizController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-quiz/:courseID", isUserLoggedIn, isUserTeacher, QuizController.createQuiz)
routes.get("/get-quiz/:courseID", isUserLoggedIn, QuizController.getQuiz)
routes.get("/quiz-countdown/:quizID", isUserLoggedIn, isUserStudent, QuizController.startQuizCountdown)
routes.post("/submit-quiz/:quizID", isUserLoggedIn, isUserStudent, QuizController.submitQuiz)

module.exports = routes 