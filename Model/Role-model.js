const mongoose = require("mongoose")

var RoleSchema = new mongoose.Schema({
    roleName : {
        type : String,
        require : true,
        max : 15
    }
})

module.exports = mongoose.model("role",RoleSchema)