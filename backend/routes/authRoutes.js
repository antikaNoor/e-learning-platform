const express = require('express')
const routes = express()
const AuthController = require('../controller/authController')

routes.post("/signup", AuthController.signUp)
// routes.post("/login", AuthController.login)

module.exports = routes 