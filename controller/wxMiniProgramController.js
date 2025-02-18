const responseBody = require("../utils/utils").responseBody;
const _ = require("lodash");
const wxMiniProgramModel = require("../model/wxMiniProgramModel");
const logger = require("../utils/logger");
const wxMiniProgramConfig = require(`../config/${require("../config/config").envType}.config`).wxMiniProgramConfig;
const axios = require('axios')
const jwt = require("../utils/jwt");
const jwtSecret = require(`../config/${require("../config/config").envType}.config`).jwtSecret;
const jwt_token_expire_time = require(`../config/${require("../config/config").envType}.config`).jwt_token_expire_time;
const jwtRefreshSecret = require(`../config/${require("../config/config").envType}.config`).jwtRefreshSecret;
const jwt_refresh_token_expire_time = require(`../config/${require("../config/config").envType}.config`).jwt_refresh_token_expire_time;
const wxJscode2sessionUrlPrefix = 'https://api.weixin.qq.com/sns/jscode2session?appid='

/* 登陆后，前端每次发请求，后端都从请求头的中获取Authorization字段,去掉前面的字符串'Bearer ',余下的即是token，这一步在auth.js中已经实现了
*  这里使用token + refreshToken 机制
*/

exports.getToken = async (req, res, next) => {
    // 如果多了req.body多了验证码等verifyCode参数，直接用 delete user.verifyCode；删除该属性，以免调用getUserByCondition或者getItemsByCondition 方法时出问题
    const code = req.body.code;
    const wx_app_id = wxMiniProgramConfig.app_id;
    const wx_app_secret = wxMiniProgramConfig.app_secret;
    let url = wxJscode2sessionUrlPrefix + wx_app_id + "&secret=" + wx_app_secret + "&js_code=" + code + "&grant_type=authorization_code";

    let response;
    try {
        response = await axios.get(url); //openid, session_key
    } catch (error) {
        logger.error("请求微信服务器出现异常", error);
        return res.status(500).json(responseBody(500, "服务器内部错误"));
    }
    const { openid, session_key } = response.data;

    let getResults;
    try {
        getResults = await wxMiniProgramModel.getUserByOpenId(openid);
    } catch (error) {
        logger.error("执行mysql查询函数getUserByOpenId出现异常", error);
        return res.status(500).json(responseBody(500, "服务器内部错误"));
    }

    if (_.isEmpty(getResults)) {
        // 表中不存在对应openid的用户，接下来创建，在mysql的user表中插入该openid的人
        try {
            await wxMiniProgramModel.insertUser([openid, null, null, null, null, null]);
        } catch (error) {
            logger.error("执行mysql插入函数insertUser出现异常", error);
            return res.status(500).json(responseBody(500, "服务器内部错误"));
        }
    }

    try {
        const accessToken = await jwt.sign({
            openid: openid,
        }, jwtSecret, jwt_token_expire_time);
        const refreshToken = await jwt.sign({
            openid: openid,
        }, jwtRefreshSecret, jwt_refresh_token_expire_time);
        return res.status(200).json(responseBody(200, "获取token成功", { accessToken, refreshToken }));
    } catch (error) {
        res.status(401).json(responseBody(401, "获取token失败"));
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json(responseBody(401, "refreshToken为空,刷新access_token失败"));
    }
    let decoded;
    try {
        // 验证 Refresh Token
        decoded = await jwt.verify(refreshToken, jwtRefreshSecret);
        console.log(decoded)
    } catch (err) {
        return res.status(403).json(responseBody(403, "refreshToken验证失败,无法刷新access_token"));
    }

    try {
        // 生成新的 Access Token
        const newAccessToken = await jwt.sign({ openid: decoded.openid }, jwtSecret, jwt_token_expire_time);
        return res.status(200).json(responseBody(200, "刷新accessToken成功", { accessToken: newAccessToken }));
    } catch (error) {
        next(error);
    }
}

exports.getMyInfo = async (req, res, next) => {
    return res.status(200).json(responseBody.ok(req.user));
}