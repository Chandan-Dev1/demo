const  express = require("express")
const authRoutes = express.Router()
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

authRoutes.post("/register", async (req,res)=>{
    const {name,email,password}=req.body

    const isUsereexist = await UserModel.findOne({email})

    if(isUsereexist){
       return  res.status(409).json({
            message:"user email is already exist "
        })
    }
    const user = await UserModel.create({
        name,email,password
    })

    const token=jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET
)

res.cookie("cookie",token)
    
    res.status(201).json({
        message:"user register successfully ...?",
        user,
    })
})

module.exports=authRoutes