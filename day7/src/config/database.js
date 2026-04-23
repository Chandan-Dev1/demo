const mongoose = require("mongoose")

function Connectdb(){
    mongoose.connect(process.env.MONGO_URI)
    console.log("database is connect")
}

Connectdb()

module.exports=Connectdb