var router = require("express").Router()
const userController = require("../Controller/User-controller");

router.post("/login",userController.login)
router.post("/signup",userController.signup)

module.exports = router