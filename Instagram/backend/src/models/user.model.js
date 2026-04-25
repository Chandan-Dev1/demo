const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"email is already exist"],
        required:true
    },
    password:{
        type:String,
        require:true
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/0nug0iufb/image%20default.jpg?updatedAt=1770908474003"
    }
})

const UserModel = mongoose.model("user",UserSchema)

module.exports=UserModel