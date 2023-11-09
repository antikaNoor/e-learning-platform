const express = require('express')
const routes = express()
const ReviewController = require('../../controller/review/reviewController')
const { authValidator, reviewValidator } = require('../../middleware/validation')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/add-review", isUserLoggedIn, isUserStudent, reviewValidator.addReview, ReviewController.createValiadtion, ReviewController.addReview)
routes.delete("/delete-review/:reviewID", isUserLoggedIn, isUserStudent, ReviewController.deleteReview)
routes.delete("/delete-review-text/:reviewID", isUserLoggedIn, isUserStudent, ReviewController.deleteReviewText)

module.exports = routes 