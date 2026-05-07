const express = require("express")
const authRoutes = express.Router()
const authController = require("../controllers/auth.controller")
const identifyUser = require('../middlewares/Auth.middleware')


authRoutes.post("/register",authController.Register)

authRoutes.post("/login",authController.Login)

authRoutes.get("/get-me",identifyUser,authController.getMeController)
module.exports=authRoutes