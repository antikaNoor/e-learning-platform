const express = require('express')
const routes = express()
const CourseApprovalController = require('../../controller/notification/courseApproval')
const SubscriptionApprovalController = require('../../controller/notification/subscriptionApproval')
const TeacherApprovalController = require('../../controller/notification/teacherInfoController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')
const courseApproval = require('../../controller/notification/courseApproval')
const teacherInfoController = require('../../controller/notification/teacherInfoController')

// course approval
routes.post("/publish-course", isUserLoggedIn, isUserTeacher, CourseApprovalController.publishCourse)
routes.post("/course-approval", isUserLoggedIn, isUserAdmin, CourseApprovalController.acceptOrRejectCourse)

// subscription approval
routes.post("/request-for-subscription", isUserLoggedIn, isUserStudent, SubscriptionApprovalController.requestForSubscription)
routes.post("/subscription-approval/:notificationID", isUserLoggedIn, isUserAdmin, SubscriptionApprovalController.acceptOrRejectSubscription)

// teacher approval
routes.post("/teacher-request", isUserLoggedIn, TeacherApprovalController.addTeacherInfo)
routes.post("/teacher-approval/:notificationID", isUserLoggedIn, isUserAdmin, TeacherApprovalController.acceptOrRejectTeacher)

// view
routes.get("/show-all-subscription-request", isUserLoggedIn, isUserAdmin, SubscriptionApprovalController.showAllSubscriptionRequest)
routes.get("/show-all-notification", isUserLoggedIn, isUserAdmin, CourseApprovalController.showAllNotification)
routes.get("/show-teachers-notification", isUserLoggedIn, isUserTeacher, CourseApprovalController.showATeachersNotification)

routes.get("/show-all-teacher-request", isUserLoggedIn, isUserAdmin, teacherInfoController.showAllTeacherRequest)

module.exports = routes 