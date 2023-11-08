const express = require('express')
const routes = express()
const CategoryController = require('../../controller/course/categoryController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/create-category", isUserLoggedIn, isUserAdmin, CategoryController.createCategory)
routes.post("/delete-category", isUserLoggedIn, isUserAdmin, CategoryController.deleteCategory)

module.exports = routes 