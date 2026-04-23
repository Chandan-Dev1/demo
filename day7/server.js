require('dotenv').config()
const app = require("./src/app")
const connectdb= require("./src/config/database")
const authRoutes=require("./src/routes/auth.route")
app.listen(3000,()=>{
    console.log("server is runnig port 3000")
})