const express = require("express")
const cookieparser = require('cookie-parser')
const authRoutes = require("../src/routes/auth.route")

const app = express()
app.use(express.json())
app.use(cookieparser())

app.use("/api/auth",authRoutes)
module.exports=app