const { query, body, validationResult } = require("express-validator");
const validate = require("../middleware/validate");
const userModel = require("../model/userModel");
const _ = require("lodash");

exports.register = validate([
  // 使用验证中间件检查 'username' 参数是否存在且非空
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .bail()
    .custom(async (username) => {
      const user = await userModel.getUserByUsername(username);
      if (!_.isEmpty(user)) return Promise.reject("该用户名已存在");
    }),
  // 使用验证中间件检查 'password' 参数是否存在且非空
  body("password").notEmpty().withMessage("密码不能为空"),
  // 使用验证中间件检查 'email' 参数是否存在、非空，并符合邮箱格式
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确"),
]);

exports.login = validate([
  // 使用验证中间件检查 'username' 参数是否存在且非空
  body("username").notEmpty().withMessage("用户名不能为空"),
  // 使用验证中间件检查 'password' 参数是否存在且非空
  body("password").notEmpty().withMessage("密码不能为空"),
]);

exports.getUserById = validate([
  // 使用验证中间件检查 'id' 参数是否存在且非空
  query("id").notEmpty().withMessage("id不能为空"),
]);
