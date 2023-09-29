const config = {
  morganLevel: "dev",
  winstonLevel: "info",
  mysqlConnectionConfig: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "express_demo",
    waitForConnections: true, // 是否等待空闲连接
    connectionLimit: 10, // 连接池最大连接数
    queueLimit: 0, // 连接池中最大等待连接数，0 表示不限制
  },
  redisConnectionConfig: {
    host: "localhost", // Redis 服务器的主机名
    port: 6379, // Redis 服务器的端口号
    connectionName: "myApp", // 连接名称
    maxRetriesPerRequest: 3, // 每个请求的最大重试次数
    enableAutoPipelining: true, // 启用自动流水线（自动批量命令）
  },
};

module.exports = config;
