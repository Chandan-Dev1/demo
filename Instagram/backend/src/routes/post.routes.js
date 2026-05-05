const express = require("express")
const PostRoutes = express.Router()
const multer = require("multer")
const identifyUser = require("../middlewares/Auth.middleware")
const upload = multer({storage:multer.memoryStorage()})

const PostController = require("../controllers/post.controller")

PostRoutes.post("/",upload.single("image"),identifyUser,PostController.CreatePostController)

PostRoutes.get("/",identifyUser,PostController.getPostController)
PostRoutes.get("/detail/:postId",identifyUser,PostController.getPostDetail)

module.exports=PostRoutes