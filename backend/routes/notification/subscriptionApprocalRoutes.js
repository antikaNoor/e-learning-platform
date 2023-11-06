const express = require('express')
const routes = express()
const SubscriptionApprovalController = require('../../controller/notification/subscriptionApproval')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/request-for-subscription", isUserLoggedIn, isUserStudent, isUserVerified, SubscriptionApprovalController.requestForSubscription)
routes.post("/subscription-approval", isUserLoggedIn, isUserAdmin, isUserVerified, SubscriptionApprovalController.acceptOrRejectSubscription)

module.exports = routes 