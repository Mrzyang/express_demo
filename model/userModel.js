const mysqlGetConnection = require("../utils/mysql"); // 根据你的路径来引入 mysqlGetConnection

exports.getUserInfoById = async (id) => {
  try {
    // 获取数据库连接
    const connection = await mysqlGetConnection();

    // 执行查询操作
    const [rows] = await connection.query("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    // 释放连接
    connection.release();
    // 返回查询结果
    return rows;
  } catch (error) {
    throw error;
  }
};
