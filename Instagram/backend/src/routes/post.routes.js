const express = require("express")
const PostRoutes = express.Router()
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

const PostController = require("../controllers/post.controller")

PostRoutes.post("/",upload.single("image"),PostController.CreatePostController)

PostRoutes.get("/",PostController.getPostController)

module.exports=PostRoutes