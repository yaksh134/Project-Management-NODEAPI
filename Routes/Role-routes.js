var router = require("express").Router()

var roleController = require("../Controller/Role-controller");
router.post("/role",roleController.createRole);
router.get("/role",roleController.getAllRoles);
router.get("/role/:id",roleController.getRoleById);

module.exports = router;