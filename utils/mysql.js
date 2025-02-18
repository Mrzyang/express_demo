const config = require(`../config/${require('../config/config').envType}.config`).mysqlConnectionConfig;
const mysqlPromise = require('mysql2/promise');
const mysql = require('mysql2');

class MysqlPromiseUtils {
  constructor() {
    this.pool = mysqlPromise.createPool(config);
  }

  async query(sql, values) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.query(sql, values);
      return rows;
    } finally {
      connection.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}

class MysqlUtils {
  constructor() {
    this.pool = mysql.createPool(config);
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query(sql, values, (queryErr, results) => {
          connection.release();

          if (queryErr) {
            return reject(queryErr);
          }
          resolve(results);
        });
      });
    });
  }

  close() {
    this.pool.end();
  }
}

const dbUtils = {
  mysqlPromiseUtils: MysqlPromiseUtils,
  mysqlUtils: MysqlUtils
}
module.exports = dbUtils;