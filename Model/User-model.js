const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name : String,
    emailId : String,
    password : String,
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "role"
    }
});

module.exports = mongoose.model("User",UserSchema)