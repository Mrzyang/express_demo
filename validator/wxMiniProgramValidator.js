const { body } = require("express-validator");
const validate = require("../middleware/validate");

exports.getToken = validate([
  // 使用验证中间件检查 'code' 参数是否存在且非空
  body("code").notEmpty().withMessage("微信code不能为空")
]);

exports.refreshToken = validate([
  // 使用验证中间件检查 'username' 参数是否存在且非空
  body("refreshToken").notEmpty().withMessage("refreshToken不能为空")
]);