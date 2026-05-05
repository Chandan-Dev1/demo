const mongoose = require("mongoose")

const FollowSchema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:[true,"follow is require"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Followee is required"]
    }
}, {
    timestamps: true
})

const FollowModel = mongoose.model("follow",FollowSchema)

module.exports=FollowModel
