const config = {
  morganLevel: "dev",
  winstonLevel: "info",
  jwtSecret: "3b59ee4e-5ecb-11ee-8c99-0242ac120002",
  jwtRefreshSecret: "6b0b90bb-4903-3c9f-9348-a5d4af042fcb",
  jwt_token_expire_time: "1h",
  jwt_refresh_token_expire_time: "7d",
  redis_jwt_token_expire_time: 60 * 60, //单位秒，redis中的jwt token过期时间，应该与上面的jwt_token_expire_time保持一致
  mysqlConnectionConfig: {
    host: "db4free.net",
    user: "mrzyang",
    password: "Zy@19961004",
    database: "mrzyang_db",
    waitForConnections: true, // 是否等待空闲连接
    connectionLimit: 10, // 连接池最大连接数
    queueLimit: 0, // 连接池中最大等待连接数，0 表示不限制
  },
  redisConnectionConfig: {
    host: "redis-12057.c293.eu-central-1-1.ec2.cloud.redislabs.com", // Redis 服务器的主机名
    port: 12057, // Redis 服务器的端口号
    username: "default",
    password: "7g8MH3v54jzh8SKSf6ADQwpoJyoYOYSr",
    connectionName: "myApp", // 连接名称
    maxRetriesPerRequest: 3, // 每个请求的最大重试次数
    enableAutoPipelining: true, // 启用自动流水线（自动批量命令）
  },
  wxMiniProgramConfig: { //微信小程序配置
    app_id: "wx217f9f8bf1cfb0c1",
    app_secret: "05de3e53617d1c04fbef30697f2f0bc1"
  }
};

module.exports = config;
