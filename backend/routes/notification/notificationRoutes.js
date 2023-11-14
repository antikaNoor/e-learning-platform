const express = require('express')
const routes = express()
const CourseApprovalController = require('../../controller/notification/courseApproval')
const SubscriptionApprovalController = require('../../controller/notification/subscriptionApproval')
const TeacherApprovalController = require('../../controller/notification/teacherInfoController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

// course approval
routes.post("/publish-course", isUserLoggedIn, isUserTeacher, CourseApprovalController.publishCourse)
routes.post("/course-approval", isUserLoggedIn, isUserAdmin, CourseApprovalController.acceptOrRejectCourse)

// subscription approval
routes.post("/request-for-subscription", isUserLoggedIn, isUserStudent, SubscriptionApprovalController.requestForSubscription)
routes.post("/subscription-approval/:notificationID", isUserLoggedIn, isUserAdmin, SubscriptionApprovalController.acceptOrRejectSubscription)

// teacher approval
routes.post("/teacher-request", isUserLoggedIn, TeacherApprovalController.addTeacherInfo)
routes.post("/teacher-approval", isUserLoggedIn, isUserAdmin, TeacherApprovalController.acceptOrRejectTeacher)

module.exports = routes 