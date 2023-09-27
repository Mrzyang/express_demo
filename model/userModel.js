const MySQLUtils = require('../utils/mysql').mysqlPromiseUtils; // 替换成你的模块路径

exports.list = async () => {
  const db = new MySQLUtils();
  try {
    const results = await db.query('SELECT * FROM user');
    return results;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // 关闭数据库连接
    await db.close();
  }
}


exports.getUserById = async (id) => {
  const db = new MySQLUtils();
  try {
    const results = await db.query('SELECT * FROM user where id = ?', [id]);
    return results;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // 关闭数据库连接
    await db.close();
  }
}

