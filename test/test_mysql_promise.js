const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'express_demo'
});

// 声明异步函数
async function getUserInfoById(id) {
  try {
    // 获取数据库连接
    const connection = await pool.getConnection();

    // 执行查询操作
    const [rows] = await connection.query('SELECT * FROM user WHERE id = ?', [id]);

    // 释放连接
    connection.release();

    // 返回查询结果
    return rows;
  } catch (error) {
    throw error;
  }
}

// 使用异步函数
(async () => {
  try {
    const userId = 1; // 替换成你要查询的用户ID
    const userInfo = await getUserInfoById(userId);
    console.log(userInfo);
  } catch (error) {
    console.error('Error:', error);
  }
})();
