const MySQLUtils = require("../utils/mysql").mysqlPromiseUtils; // 替换成你的模块路径
const commonModel = require("./commonModel");
const mysqlTableList = require("../config/config").mysqlTableList;

exports.getUserByCondition = async (user) => {
  try {
    const results = await commonModel.getItemsByCondition(
      mysqlTableList.USER,
      user
    );
    return results;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.list = async () => {
  try {
    const results = await exports.getUserByCondition();
    return results;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getUserById = async (user) => {
  try {
    const results = await exports.getUserByCondition(user);
    return results;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getUserByUsername = async (user) => {
  try {
    const results = await exports.getUserByCondition(user);
    return results;
  } catch (error) {
    return Promise.reject(error);
  }
};
