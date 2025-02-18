const { query } = require("express-validator");
const validate = require("../middleware/validate");

exports.download = validate([
  query("filename").notEmpty().withMessage("要下载的文件名不能为空"),
]);
