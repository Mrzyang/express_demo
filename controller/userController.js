const userModel = require("../model/userModel");
const logger = require("../utils/logger");

exports.register = async (req, res, next) => {
  // 接收post请求参数
  const { username, password, email } = req.body;
  // 记录业务日志
  logger.info("访问了注册接口 post /api/user/register");
  console.log(username, password, email);
  try {
    // 处理请求
    res.send("post /api/user/register");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /api/user/register");
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    let userList = await userModel.list();
    res.json(userList);
  } catch (error) {
    res.json({
      err: error,
    });
  }
};

exports.getUserById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let userInfo = await userModel.getUserById(id);
    res.json(userInfo);
  } catch (error) {
    res.json({
      err: error,
    });
  }
};
