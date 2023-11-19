const express = require('express')
const routes = express()
const CartController = require('../../controller/subscription/cartController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher,
    CartAuthenticationMiddleware } = require('../../middleware/auth')

routes.post("/add-to-cart", isUserLoggedIn, isUserStudent, CartController.addToCart)
routes.delete("/remove-from-cart/:cartID/:courseID", isUserLoggedIn, isUserStudent, CartController.removeFromCart)
routes.delete("/remove-all-from-cart/:cartID", isUserLoggedIn, isUserStudent, CartController.deleteCart)
routes.get("/get-your-cart", isUserLoggedIn, isUserStudent, CartController.getYourCart)
routes.get("/get-all-carts", isUserLoggedIn, isUserAdmin, CartController.getAllCarts)

module.exports = routes 