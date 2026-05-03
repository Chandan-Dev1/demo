const mongoose = require("mongoose")

async function ConnectDB(){
    await mongoose.connect()
        .then(()=>{
            console.log("databse is connect")
        })
}

module.exports=ConnectDB