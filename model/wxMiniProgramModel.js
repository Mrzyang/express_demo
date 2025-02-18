const MySQLUtils = require("../utils/mysql").mysqlPromiseUtils; // 替换成你的模块路径
const commonModel = require("./commonModel");
const mysqlTableList = require("../config/config").mysqlTableList;
const logger = require("../utils/logger");

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

exports.getUserByOpenId = async (openid) => {
    try {
        let user = { openid: openid }
        const results = await exports.getUserByCondition(user);
        return results;
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.insertUser = async (row) => {
    console.log("================================================")
    console.log(row)
    console.log("================================================")
    // logger.info("row参数的值:", row);
    let sql = "insert into user (openid, name, username, password, gender, age) values (?, ?, ?, ?, ?, ?) "
    try {
        const db = new MySQLUtils();
        const results = await db.query(sql, row);
        return results;
    } catch (error) {
        return Promise.reject(error);
    }
};
