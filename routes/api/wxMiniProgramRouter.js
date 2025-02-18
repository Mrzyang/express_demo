var express = require("express");
var router = express.Router();
var wxMiniProgramController = require("../../controller/wxMiniProgramController");
const wxMiniProgramValidator = require("../../validator/wxMiniProgramValidator");
const wxMiniProgramAuth = require("../../middleware/wxMiniProgramAuth");

router.post("/getToken", wxMiniProgramValidator.getToken, wxMiniProgramController.getToken);
router.post("/refreshToken", wxMiniProgramValidator.refreshToken, wxMiniProgramController.refreshToken);
router.get("/getMyInfo", wxMiniProgramAuth, wxMiniProgramController.getMyInfo);
module.exports = router;