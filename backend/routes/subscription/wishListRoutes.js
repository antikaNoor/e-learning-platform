const express = require('express')
const routes = express()
const WishListController = require('../../controller/subscription/wishListController')
const { isUserLoggedIn,
    isUserAdmin,
    isUserStudent,
    isUserTeacher } = require('../../middleware/auth')
const wishListController = require('../../controller/subscription/wishListController')

routes.post("/add-to-wishlist", isUserLoggedIn, isUserStudent, WishListController.addToWishList)
routes.delete("/remove-from-wishlist/:wishlistID/:courseID", isUserLoggedIn, isUserStudent, WishListController.removeFromWishList)
routes.delete("/remove-all-from-wishlist/:wishlistID", isUserLoggedIn, isUserStudent, WishListController.deleteWishList)
routes.get("/get-your-wishlist", isUserLoggedIn, isUserStudent, WishListController.getYourWishList)
routes.get("/get-all-wishlists", isUserLoggedIn, isUserAdmin, wishListController.getAllWishLists)

module.exports = routes 