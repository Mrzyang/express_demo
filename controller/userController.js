const userModel = require("../model/userModel");
const logger = require("../utils/logger");
const jwt = require("../utils/jwt");
const _ = require("lodash");
const jwtSecret = require(`../config/${require("../config/config").envType}.config`).jwtSecret;
const jwt_token_expire_time = require(`../config/${require("../config/config").envType}.config`).jwt_token_expire_time;
const redis_jwt_token_expire_time = require(`../config/${require("../config/config").envType}.config`).redis_jwt_token_expire_time;
const responseBody = require("../utils/utils").responseBody;
const redis = require("../utils/redis");

exports.register = async (req, res, next) => {
  // 接收post请求参数
  const { username, password, email } = req.body;
  // 记录业务日志
  logger.info([username, password, email]);
  try {
    // 处理请求，数据库操作
    return res.status(200).json(responseBody(200, "注册成功"));
  } catch (error) {
    next(error); //服务器内部错误用 next(error); 业务逻辑操作失败用 return res.json(responseBody.failed());
  }
};

exports.login = async (req, res, next) => {
  // 如果多了req.body多了验证码等verifyCode参数，直接用 delete user.verifyCode；删除该属性，以免调用getUserByCondition或者getItemsByCondition 方法时出问题
  const user = req.body;
  let id;
  try {
    const results = await userModel.getUserByCondition(user);
    if (_.isEmpty(results)) {
      return res.json(responseBody(500, "用户名或密码错误或用户不存在"));
    } else id = results[0].id; //获取用户id
  } catch (error) {
    next(error);
  }

  const token = await jwt.sign({
    id: id,
    username: user.username,
  }, jwtSecret, jwt_token_expire_time);

  try {
    await redis.setex('jwt_token_userId:' + id, redis_jwt_token_expire_time, token)
    return res.json(
      responseBody(200, "登陆成功", { token })
    );
  } catch (error) {
    next(error);
  }
};

// 登出：作废redis中的token即可
exports.logout = async (req, res, next) => {
  try {
    await redis.del('jwt_token_userId:' + req.user.id);
    return res.json(
      responseBody(200, "退出登陆成功")
    );
  } catch (error) {
    next(error);
  }
}

exports.getCurrentUser = async (req, res, next) => {
  //从auth.js中间件中传递过来的user对象
  return res.json(responseBody.ok(req.user));
};

exports.list = async (req, res, next) => {
  try {
    let results = await userModel.list();
    return res.json(responseBody.ok(results));
  } catch (error) {
    next(error);
  }
};

exports.getUserByCondition = async (req, res, next) => {
  try {
    let user = await userModel.getUserByCondition(req.query);
    return res.status(200).json(responseBody.ok(user));
  } catch (error) {
    //next(error) 是传递错误信息到最后的错误处理中间件
    next(error);
    //服务器内部错误用 next(error); 业务逻辑操作失败或者不正常(如登陆验证失败，余额不足购买失败)用 return res.json(responseBody.failed());
  }
};

// 这个函数没什么用，已经被前面的getUserByCondition取代
exports.getUserById = async (req, res, next) => {
  let user = req.query;
  try {
    let results = await userModel.getUserById(user);
    return res.json(responseBody.ok(results));
  } catch (error) {
    next(error);
  }
};

