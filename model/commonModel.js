const MySQLUtils = require("../utils/mysql").mysqlPromiseUtils; // 替换成你的模块路径
const logger = require("../utils/logger");

exports.getItemsByCondition = async (tableName, conditonObject = {}) => {
  let sql = `SELECT * FROM ${tableName}`;
  const numberOfProperties = Object.keys(conditonObject).length;
  if (numberOfProperties > 0) sql += " where";
  let count = 0;
  for (let key in conditonObject) {
    count++;
    sql += ` ${key} = ? `;
    if (count !== numberOfProperties) sql += "and";
  }
  logger.info('getItemsByCondition--sql: ' + sql);
  const db = new MySQLUtils();
  try {
    const results = await db.query(sql, Object.values(conditonObject));
    return results;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    // 关闭数据库连接
    await db.close();
  }
};
