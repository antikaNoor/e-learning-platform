const express = require('express')
const routes = express()
const CategoryController = require('../../controller/course/categoryController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')
const { categoryValidator } = require('../../middleware/validation')

routes.post("/create-category", isUserLoggedIn, isUserAdmin, categoryValidator.addCategory, CategoryController.createValiadtion, CategoryController.createCategory)
routes.delete("/delete-category/:categoryID", isUserLoggedIn, isUserAdmin, CategoryController.deleteCategory)
routes.patch("/edit-category/:categoryID", isUserLoggedIn, isUserAdmin, CategoryController.editCategory)
routes.get("/get-all-categories", CategoryController.getAllCategories)
routes.get("/get-topics-under-category/:categoryID", CategoryController.getTopicsUnderCategory)
routes.get("/get-courses-under-category/:categoryID", CategoryController.getCoursesUnderCategory)

module.exports = routes 