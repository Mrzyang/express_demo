const getMysqlConnection = require("../../utils/mysql"); // 根据你的路径来引入 mysql 函数
const redis = require("../../utils/redis");
const userModel = require('../../model/userModel')


exports.register = async (req, res, next) => {
  try {
    // 处理请求
    res.send("post /api/user/register");
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    let userList =await userModel.list();
    res.json(userList);
  } catch (error) {
    res.json({
      err: error
    })
  }
};


exports.getUserById = async (req, res, next) => {
  let id = req.query.id;
  try {
    let userInfo =await userModel.getUserById(id);
    res.json(userInfo);
  } catch (error) {
    res.json({
      err: error
    })
  }
}