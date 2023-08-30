const config = require(`../config/${require('../config/config').envType}.config`);
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool(config.mysqlConnectionConfig);

// 从连接池获取连接   query回调类型
const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      resolve(connection);
    });
  });
};



const PromisePool = async() => mysqlPromise.createPool(config.mysqlConnectionConfig);


// 从连接池获取连接   query  Promise类型
const getPromiseConnection = await PromisePool.getConnection();

const getMysqlConnection = {
  getConnection: getConnection,
  getPromiseConnection: getPromiseConnection
}

module.exports = getMysqlConnection; // 导出 getConnection 函数
