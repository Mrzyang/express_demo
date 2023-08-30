var express = require("express");
var router = express.Router();
var homeController = require("../../controller/home/homeController");

router.get("/", homeController.index);
module.exports = router;
