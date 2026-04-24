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

authRoutes.get("/register", async (req,res)=>{
    const {email,password}=req.body

    const user = await UserModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    
    const fatchpassword = user.password===password

    if(!fatchpassword){
        return res.status(401).json({
            message:"invailid password"
        })
    }

    const token=jwt.sign({
        id:user._id
    },  
    process.env.JWT_SECRET
    )

    res.cookie("token",token)
    res.status(200).json({
        message:"login successfully ",
        user
    })
})

module.exports=authRoutes