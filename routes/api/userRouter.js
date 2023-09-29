var express = require("express");
var router = express.Router();
// query:获取get请求URL参数; param: 获取get请求url路径中的参数;body:获取post请求参数
const { query, body, validationResult } = require("express-validator");
var userController = require("../../controller/userController");

router.post(
  "/register",
  [
    // 使用验证中间件检查 'username' 参数是否存在且非空
    body("username").notEmpty().withMessage("用户名不能为空"),
    // 使用验证中间件检查 'password' 参数是否存在且非空
    body("password").notEmpty().withMessage("密码不能为空"),
    // 使用验证中间件检查 'email' 参数是否存在、非空，并符合邮箱格式
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
  ],
  (req, res, next) => {
    // 检查验证错误
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 如果有验证错误，返回包含错误信息的 JSON 响应
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.register
);

router.post(
  "/login",
  [
    // 使用验证中间件检查 'username' 参数是否存在且非空
    body("username").notEmpty().withMessage("用户名不能为空"),
    // 使用验证中间件检查 'password' 参数是否存在且非空
    body("password").notEmpty().withMessage("密码不能为空"),
  ],
  (req, res, next) => {
    // 检查验证错误
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 如果有验证错误，返回包含错误信息的 JSON 响应
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.login
);

router.get("/list", userController.list);

router.get(
  "/getUserById",
  [
    // 使用验证中间件检查 'id' 参数是否存在且非空
    query("id").notEmpty().withMessage("ID不能为空"),
  ],
  (req, res, next) => {
    // 检查验证错误
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 如果有验证错误，返回包含错误信息的 JSON 响应
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.getUserById
);

module.exports = router;
