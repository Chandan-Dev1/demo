const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUri:{
        type:String,
        required:[true,"img_Uri is require for create a post "]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"user",
        required:[true,"user id is required for create a post"]
    }
})

const PostModel = mongoose.model("posts",PostSchema)

module.exports=PostModel