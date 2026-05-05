const PostModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


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
   
    const UserId = req.user
    const posts = await PostModel.find({
        user:UserId
    })
    res.status(200).json({
        message:"post fatch seccessfully ...",
        posts
    })
}

async function getPostDetail(req,res){
    
    const UserId = req.user
    const  postId=req.params.postId

    if(!postId){
        return res.status(404).jso({
            message:"post not found"
        })
    }
    const isvalidUser = post.user.toStrin() === UserId

    if(!isvalidUser){
        return res.status(403).jso({
            message:"not create a post "
        })
    }
    return res.status(200).jso({
        message:"post create successfully ",
        post
    })
}

module.exports={CreatePostController,getPostController,getPostDetail}