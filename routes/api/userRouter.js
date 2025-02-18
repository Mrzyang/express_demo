var express = require("express");
var router = express.Router();
const auth = require("../../middleware/auth");
var userController = require("../../controller/userController");
const userValidator = require("../../validator/userValidator");

router.post("/register", userValidator.register, userController.register);

router.post("/login", userValidator.login, userController.login);

//auth.js中间件适用于放在需要登陆的接口前面调用
router.get("/getCurrentUser", auth, userController.getCurrentUser);

router.get("/list", userController.list);

router.get("/getUserByCondition", userController.getUserByCondition);

router.get("/getUserById", userValidator.getUserById, userController.getUserById);

module.exports = router;
