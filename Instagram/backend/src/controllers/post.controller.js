const PostModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})
async function CreatePostController(req,res) {
    console.log(req.file)

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"user not found "
        }) 
    }
     let decoded =null
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message:"user is anthorise "
        })
    }
  


    const file = await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test",
        folder:"/chandan"
    
    })
    const post =  await PostModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:decoded.id
    })
    res.status(201).json({
    message:"post create suceessfuly",
    post
    })
}

async function getPostController(req,res) {
    const token = req.cookies.token
    
    let decoded=null

    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch (err){
        return res.status(401).json({
            message:"user is anuthorize access"
        })
    }
    const UserId = decoded.id
    const posts = await PostModel.find({
        user:UserId
    })
    res.status(200).json({
        message:"post fatch seccessfully ...",
        posts
    })
}

async function getPostDetail(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"anuthorize user access"
        })
    }
    
    let decoded=null
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch (err){
        return res.status(401).json({
            message:"anuthorize user access"
        })
    }

    const UserId = decoded.id
    const  postId=req.params.postId

    if(!postId){
        return res.status(404).jso({
            message:"post not found"
        })
    }
}

module.exports={CreatePostController,getPostController}