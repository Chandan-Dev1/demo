const mongoose =require("mongoose")

async function Connectdatabase() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("database connect successfully...?")
        })
}

Connectdatabase()

module.exports=Connectdatabase