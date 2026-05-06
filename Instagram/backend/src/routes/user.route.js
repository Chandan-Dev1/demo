const express = require("express")
const userRoutes = express.Router()
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/Auth.middleware")

userRoutes.post("/follow/:username",identifyUser,userController.followUserController)
userRoutes.post("/unfollow/:username",identifyUser,userController.unfollowUserController)
module.exports=userRoutes
