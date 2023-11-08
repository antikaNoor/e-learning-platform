const express = require('express')
const routes = express()
const CartController = require('../../controller/subscription/cartController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/add-to-cart", isUserLoggedIn, isUserStudent, CartController.addToCart)

module.exports = routes 