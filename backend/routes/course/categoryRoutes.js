const express = require('express')
const routes = express()
const CategoryController = require('../../controller/course/categoryController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/create-category", isUserLoggedIn, isUserAdmin, isUserVerified, CategoryController.createCategory)
routes.post("/delete-category", isUserLoggedIn, isUserAdmin, isUserVerified, CategoryController.deleteCategory)

module.exports = routes 