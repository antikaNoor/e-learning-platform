const express = require('express')
const routes = express()
const ReviewController = require('../../controller/review/reviewController')
const { authValidator, reviewValidator } = require('../../middleware/validation')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/add-review/:courseID", isUserLoggedIn, isUserStudent, reviewValidator.addReview, ReviewController.createValiadtion, ReviewController.addReview)
routes.delete("/delete-review/:reviewID", isUserLoggedIn, isUserStudent, ReviewController.deleteReview)
routes.delete("/delete-review-text/:reviewID", isUserLoggedIn, isUserStudent, ReviewController.deleteReviewText)
routes.patch("/edit-review/:reviewID", isUserLoggedIn, isUserStudent, ReviewController.editReview)
routes.get("/get-all-reviews/:courseID", ReviewController.getAllReviews)
routes.get("/get-agg-review/:courseID", ReviewController.getAggregatesReview)
routes.get("/get-your-review/:courseID", isUserLoggedIn, isUserStudent, ReviewController.getYourReview)
routes.patch("/like-review/:reviewID", isUserLoggedIn, ReviewController.likeReview)
routes.patch("/dislike-review/:reviewID", isUserLoggedIn, ReviewController.dislikeReview)

module.exports = routes 