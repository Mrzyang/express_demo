const Redis = require('ioredis');

const redis = new Redis({
    host: 'localhost',     // Redis 服务器的主机名
    port: 6379,            // Redis 服务器的端口号
    connectionName: 'myApp', // 连接名称
    maxRetriesPerRequest: 3, // 每个请求的最大重试次数
    enableAutoPipelining: true, // 启用自动流水线（自动批量命令）
    // 其他选项...
  });
  
  module.exports = redis; // 导出 getConnection 函数