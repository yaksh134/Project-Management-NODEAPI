const validator = require("validator")
const express = require("express")
const userModel = require("../Model/User-model")
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

const signup = (req,res) => {
    let name = req.body.name
    let emailid = req.body.emailid
    let password = req.body.password
    let role = req.body.role

    let errors = {}
    let isError = false 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    let passregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/

    if (name == undefined || validator.isEmpty(name)) {
        isError = true
        errors.nameError = "Please Enter Name"
    }
    if (emailid == undefined || !validator.isEmail(emailid)) {
        isError = true
        errors.emailIdError = "Please Enter Email in correct Format"
    }
    if (password == undefined || !passregex.test(password)) {
        isError = true
        errors.passwordError = "Should Contain 1 Capital,1 Small,1 Number & 1 Special Char"
    }

    if(isError){
        res.json({
            status : 401,
            msg : "Correct all errors",
            data : req.body,
            errors : errors
        })
    }else{
        userModel.findOne({"emailId":emailid},(err,success)=>{
        if(success){
            res.json({
                status : 402,
                data : emailid,
                msg : "Email Already Exists"
            })
        }else{
            let user = new userModel({
                "name" : name,
                "emailId" : emailid,
                "password" : hash,
                "role" : role
            })

            user.save(function (err,success){
                if(err){
                    res.json({
                        status : 402,
                        msg : "Something is wrong",
                        data : req.body
                    })
                } else {
                    res.json({
                        status: 200,
                        msg : "Signup is done",
                        data : success
                    })
                }
            })

        }
    })
    }
}


const login = (req,res) => {
    let emailid = req.body.emailid
    let password = req.body.password
    if(emailid == "" || password == ""){
        res.json({
            status : 401,
            msg : "Something is wrong",
            data : req.body
        })
    }else{
        userModel.findOne({"emailId":emailid}).populate("role").exec((err,success)=>{
            if(err || err == null && success == null) {
                res.json({
                    status : 402,
                    msg : "Something is wrong",
                    data : req.body
                })
            }else{
                bcrypt.compare(password,success.password , (err,result)=>{
                    if(err){
                        res.json({
                            status : 404,
                            msg : "Something is wrong",
                            data : req.body
                        })
                    }
                    if(result){
                        const payload = {
                            id : success._id,
                            name : success.name,
                            emailId : success.emailId,
                            role : success.role
                        }
                        const token = jwt.sign(payload,tokenSecret)
                        res.json({
                            status : 200,
                            msg : "User Found",
                            token : "Bearer "+token,
                            role : success.role
                        })
                    }else{
                        res.json({
                            status : 401,
                            msg : "Invalid Credentials",
                            data : "Please try again"
                        })
                    }
                })
            }
        })
    }
}

module.exports.signup = signup;
module.exports.login = login;