const express = require('express')
const routes = express()
const WishListController = require('../../controller/subscription/wishListController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')

routes.post("/add-to-wishlist", isUserLoggedIn, isUserStudent, WishListController.addToWishList)

module.exports = routes 