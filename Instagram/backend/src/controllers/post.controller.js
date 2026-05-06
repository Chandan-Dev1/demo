const PostModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
async function CreatePostController(req,res) {
    console.log(req.file)

    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test",
        folder:"/chandan"
    
    })
    const post =  await PostModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:req.user.id
    })
    res.status(201).json({
    message:"post create suceessfuly",
    post
    })
}

async function getPostController(req,res) {
   
    const UserId = req.user.id
    const posts = await PostModel.find({
        user:UserId
    })
    res.status(200).json({
        message:"post fatch seccessfully ...",
        posts
    })
}

async function getPostDetailsController(req, res) {


    const userId = req.user.id
    const postId = req.params.postId

    const post = await PostModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched  successfully.",
        post
    })

}

async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await PostModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}


module.exports={CreatePostController,getPostController,getPostController,likePostController}