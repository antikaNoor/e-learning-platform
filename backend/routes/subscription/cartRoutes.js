const express = require('express')
const routes = express()
const CartController = require('../../controller/subscription/cartController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    isUserVerified } = require('../../middleware/auth')

routes.post("/add-to-cart", isUserLoggedIn, isUserStudent, isUserVerified, CartController.addToCart)

module.exports = routes 