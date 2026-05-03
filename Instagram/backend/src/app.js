const express = require("express")
const cookieparser = require('cookie-parser')
const authRoutes = require("../src/routes/auth.route")
const PostRoutes = require("../src/routes/post.routes")

const app = express()
app.use(express.json())
app.use(cookieparser())

app.use("/api/auth",authRoutes)
app.use("/api/post",PostRoutes)
module.exports=app