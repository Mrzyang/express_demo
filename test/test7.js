const MySQLUtils = require('../utils/mysql').mysqlUtils; // 替换成你的模块路径

// 创建数据库工具实例
const db = new MySQLUtils();

// 使用数据库工具执行查询
async function fetchData() {
    try {
        const results = await db.query('SELECT * FROM user');
        console.log(results);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // 关闭数据库连接
        db.close();
    }
}

// 调用查询函数
fetchData();
