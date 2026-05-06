const express = require("express")
const cookieparser = require('cookie-parser')
const authRoutes = require("../src/routes/auth.route")
const PostRoutes = require("../src/routes/post.routes")
const userRouter = require("../src/routes/user.route")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    credentials:true,
    origin: "http://localhost:5173"
}))

app.use("/api/auth",authRoutes)
app.use("/api/post",PostRoutes)
app.use("/api/user",userRouter)
module.exports=app