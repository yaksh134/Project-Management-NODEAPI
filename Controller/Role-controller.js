const roleModel = require("../Model/Role-model")

const createRole = (req,res) =>{
    let role = new roleModel(req.body);
    roleModel.findOne({"roleName":req.body.roleName},(err,data)=>{
        if(data==null || data==undefined){
            role.save((err,success)=>{
                if (err) {
                    console.log(err);
                    res.json({
                        status: -1,
                        msg: "SMW",
                        data: "Please Try After Sometime"
                    })
                } else {
                    res.json({
                        status: 200,
                        msg: "Role save...",
                        data: success
                    })
                }
            })
        }else{
            res.json({
                status: -1,
                msg: "SMW",
                data: "Duplicate Role"
            })
        }
    })
}


const getAllRoles = (req,res)=>{
    roleModel.find((err,success)=>{
        if (err) {
            console.log(err);
            res.json({
                status: -1,
                msg: "SMW",
                data: "Please Try After Sometime"
            })
        } else {
            res.json({
                status: 200,
                msg: "Role Ret...",
                data: success
            })
        }
    })
}

const getRoleById = (req,res)=>{
    let roleId = req.params.id;
    roleModel.findById(roleId,(err,success)=>{
        if(err){
            req.json({
                status : 403,
                msg : "Something is Wrong",
                data : "Try after sometime"
            })
        } else {
            res.json({
                status : 200,
                msg : "Role Found",
                data : success
            })
        }
    })

}

module.exports.createRole = createRole;
module.exports.getAllRoles = getAllRoles;
module.exports.getRoleById = getRoleById;

