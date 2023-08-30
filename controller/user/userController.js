const mysql = require("../../utils/mysql"); // 根据你的路径来引入 mysql 函数
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
    // 处理请求
    res.send("get /api/user/list");
  } catch (error) {
    next(error);
  }
};

exports.info = async (req, res, next) => {
  try {
    const connection = await mysql.getConnection();
    connection.query("SELECT * FROM user", (err, results) => {
      connection.release(); // 释放连接回连接池
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Error fetching users" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error getting connection:", error);
    res.status(500).json({ error: "Error getting connection" });
  }
};


exports.getUserInfo = async (req, res, next) => {
  let id = req.query.id;
  try {
    let userInfo =await userModel.getUserInfoById(id)
    res.json(userInfo);
  } catch (error) {
    res.json({
      err: error
    })
  }
}