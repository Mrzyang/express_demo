const config = {
    mysqlConnectionConfig: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "express_demo",
      waitForConnections: true, // 是否等待空闲连接
      connectionLimit: 10, // 连接池最大连接数
      queueLimit: 0, // 连接池中最大等待连接数，0 表示不限制
    },
  };
  
  module.exports = config;
  