const mongoose = require("mongoose")

const monitorSchema = new mongoose.Schema({

    url:String,

    status:String

})

const monitorModel= mongoose.model("Monitor",monitorSchema)

module.exports=monitorModel