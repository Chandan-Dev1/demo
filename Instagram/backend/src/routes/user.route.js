const express = require("express")
const userRoutes = express.Router()
const userController = require("../controllers/user.controller")

userRoutes.post("/")
module.exports=userRoutes
