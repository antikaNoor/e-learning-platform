const express = require('express')
const routes = express()
const CategoryController = require('../../controller/course/categoryController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-category", isUserLoggedIn, isUserAdmin, CategoryController.createCategory)
routes.post("/delete-category", isUserLoggedIn, isUserAdmin, CategoryController.deleteCategory)
routes.get("/get-all-categories", CategoryController.getAllCategories)
routes.get("/get-topics-under-category/:categoryID", CategoryController.getTopicsUnderCategory)
routes.get("/get-courses-under-category/:categoryID", CategoryController.getCoursesUnderCategory)

module.exports = routes 