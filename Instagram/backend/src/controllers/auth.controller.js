const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

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
    const hash = await bcrypt.hash(password,10)

    const user = await UserModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign(
        { id:user._id ,username:user.username},
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

const isVailidPassword = await  bcrypt.compare(password,user.password)

if(!isVailidPassword){
    return res.status(404).json({
        message:"invalid password"
    })
}

const token = jwt.sign(
    {id:user._id,username:user.username},
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

async function getMeController(req,res){
    const UserId = req.user.id
    const user = await UserModel.findById(UserId)
    
    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}



module.exports = { Register, Login,getMeController }