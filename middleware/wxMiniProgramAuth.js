const { verify } = require("../utils/jwt");
const responseBody = require("../utils/utils").responseBody;
const jwtSecret = require(`../config/${require("../config/config").envType}.config`).jwtSecret;
const userModel = require("../model/userModel");
const logger = require("../utils/logger");

module.exports = async (req, res, next) => {
  //从请求头获取token数据,这里要注意，浏览器发送的请求头是首字母大写Authorization，服务端收到的却是全小写authorization
  let token = req.headers["authorization"];
  token = token ? token.split("Bearer ")[1] : null;
  if (!token) {
    return res.status(401).end();
  }

  let decoded;
  try {
    decoded = await verify(token, jwtSecret);
  } catch (error) {
    return res.status(401).json(responseBody(401, "jwt_token校验失败,登录失效,无权访问"));
  }
  //验证token是否有效
  // 无效 -> 响应401 状态吗
  // 有效 -> 把用户信息读取出来挂载到req的session中，也可以直接赋值给req.user
  // 继续执行后续
  try {
    req.user = ( //也可以直接赋值给req.user
      await userModel.getUserByCondition({
        openid: decoded.openid,
      })
    )[0];
    next();//继续执行后续的middleWare
  } catch (error) {
    logger.error("wxMiniProgramAuth.js中的mysql查询函数getUserByCondition执行异常", error);
    next(error);
  }
};
