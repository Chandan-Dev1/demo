const express = require("express")
const PostRoutes = express.Router()
const multer = require("multer")

const PostController = require("../controllers/post.controller")

PostRoutes.post("/",PostController.CreatePostController)

module.exports=PostRoutes