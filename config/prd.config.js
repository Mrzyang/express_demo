const config = {
  morganLevel: "dev",
  winstonLevel: "info",
  jwtSecret: "3b59ee4e-5ecb-11ee-8c99-0242ac120002",
  jwtRefreshSecret: "6b0b90bb-4903-3c9f-9348-a5d4af042fcb",
  sessionSecret: "0ef7e94c-78cc-4ca5-9a6e-e88efb7c3e72",
  jwt_token_expire_time: "1h",
  jwt_refresh_token_expire_time: "7d",
  redis_jwt_token_expire_time: 60 * 60, //单位秒，redis中的jwt token过期时间，应该与上面的jwt_token_expire_time保持一致
  session_cookie_expire_time: 60 * 60 * 1000, // 单位毫秒，这里设置的过期时长的为1小时
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
  wxMiniProgramConfig: { //微信小程序配置
    app_id: "foo",
    app_secret: "bar"
  }
};

module.exports = config;
