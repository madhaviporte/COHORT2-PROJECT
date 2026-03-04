const express = require('express')
const authController = require("../constrollers/auth.controller")
const identifyUser = require("../middlewares/auth.middlewear")



const authRouter = express.Router()

//POSt /api/auth/register

authRouter.post('/register', authController.registerController)

//Post /api/auth/login
authRouter.post('/login',authController.loginController)

// @route GET/api/auth/get-me 
// @desc get the currently logged in users information
//@access Private
authRouter.get("/get-me",identifyUser, authController.getMeController)


module.exports = authRouter