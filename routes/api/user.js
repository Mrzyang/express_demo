var express = require("express");
var router = express.Router();
var userController = require('../../controller/user/userController')


router.post('/register', userController.register)
router.get('/list', userController.list)
router.get('/info', userController.getUserInfo)

module.exports = router;