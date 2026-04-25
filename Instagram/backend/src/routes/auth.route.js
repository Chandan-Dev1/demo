const express = require("express")
const authRoutes = express.Router()
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

authRoutes.post("/register", async (req,res)=>{
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

    res.status(201).json({
        message:"user register successfuly..",
        user
    })

    const token =jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET,
    {expiresIn:"id"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user register sucessfully ",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
})

module.exports=authRoutes