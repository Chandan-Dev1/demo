const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function Register(req,res){
    const {username,email,password,bio,profileImage}=req.body

    const isUserAlreadyExist = await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user is already exist", 
        })
    }

    const user = await UserModel.create({
        username,
        email,
        password,
        bio,
        profileImage
    })

    const token = jwt.sign(
        { id:user._id },
        process.env.JWT_SECRET,
        { expiresIn:"1d" }
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user register successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

async function Login(req,res){
 const {username,email,password}=req.body

 

const user = await UserModel.findOne({
$or: [
    {username:username},
    {email:email}
]
})

if(!user){
    return res.status(404).json({
        message:"user not found"
    })
}

const token = jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("token",token)

res.status(200).json({
    message:"user login sucessfully ",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage
    }
})
}



module.exports = { Register, Login }