const express = require("express")
const authRoutes = express.Router()
const authController = require("../controllers/auth.controller")


authRoutes.post("/register",authController.Register)

authRoutes.post("/login",authController.Login)
module.exports=authRoutes