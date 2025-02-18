const jwt = require("../utils/jwt");
const jwtSecret = require(`../config/${require("../config/config").envType}.config`).jwtSecret;
const jwt_token_expire_time = require(`../config/${require("../config/config").envType}.config`).jwt_token_expire_time;
const redis_jwt_token_expire_time = require(`../config/${require("../config/config").envType}.config`).redis_jwt_token_expire_time;
const userModel = require("../model/userModel");
const logger = require("../utils/logger");
const redis = require("../utils/redis");

module.exports = async (req, res, next) => {
  //从请求头获取token数据,这里要注意，浏览器发送的请求头是首字母大写Authorization，服务端收到的却是全小写authorization
  let token = req.headers["authorization"];
  token = token ? token.split("Bearer ")[1] : null;
  if (!token) {
    return res.status(401).end();
  }

  let decoded;
  try {
    decoded = await jwt.verify(token, jwtSecret);
  } catch (error) {
    logger.info("请求头中的token解码失败 ", error);
    return res.sendStatus(403); // token验证失败，直接响应403
  }

  let storedToken;
  try {
    storedToken = await redis.get('jwt_token_userId:' + decoded.id);
    if (!storedToken) return res.sendStatus(403);
  } catch (error) {
    logger.error("查询redis出现异常 ", error);
    return res.sendStatus(500);
  }

  // 如果 Redis 中的 token 和请求中的 token 一致，说明验证通过，可以进行正常的验证后请求
  if (storedToken === token) {
    try {
      req.user = (
        await userModel.getUserByCondition({
          id: decoded.id,
        })
      )[0];

    } catch (error) {
      logger.error("根据token解码后得到user_id查询mysql出现异常 ", error);
      return res.sendStatus(500);
    }
    const currentTime = Math.floor(Date.now() / 1000);
    const timeToExpiration = decoded.exp - currentTime;
    // 如果剩余有效期小于 5 分钟，则续期
    if (timeToExpiration < 5 * 60) {
      const newToken = await jwt.sign({
        id: decoded.id,
        username: decoded.username,
      }, jwtSecret, jwt_token_expire_time);
      try {
        await redis.setex('jwt_token_userId:' + decoded.id, redis_jwt_token_expire_time, newToken)
        logger.info("更新redis中的jwt token成功, jwt token续期成功")
        /* 客户端可以从响应头中接收到这个新的 JWT，并更新其存储的令牌（例如在 Cookie 或 localStorage 中），以便在后续请求中使用。前端封装一个request方法，每次请求
        *  时都从Cookie 或 localStorage取出token放在请求头，收到服务端响应后，判断响应头Authorization字段是否为空，不为空则更新Cookie 或 localStorage中的token
        */ 
        res.setHeader('Authorization', `Bearer ${newToken}`);
        next();
      } catch (error) {
        logger.error("刷新redis中的token时出现异常 ", error);
        return res.sendStatus(500);
      }
    } else next();
  } else {
    logger.info("redis中的token与请求头中的token不一致,认证失败")
    return res.sendStatus(403);
  }
};
