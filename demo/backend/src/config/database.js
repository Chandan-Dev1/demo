const mongoose = require("mongoose")

async function Connectdb(){
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("database is connect")
        })
}

Connectdb()

module.exports=Connectdb