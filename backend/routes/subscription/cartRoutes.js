const express = require('express')
const routes = express()
const CartController = require('../../controller/subscription/cartController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/add-to-cart", isUserLoggedIn, isUserStudent, isUserVerified, CartController.addToCart)
routes.post("/remove-from-cart", isUserLoggedIn, isUserStudent, isUserVerified, CartController.removeFromCart)

module.exports = routes 