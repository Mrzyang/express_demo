const winston = require("winston");
const { createLogger, transports, format } = winston;
const winstonLevel = require(`../config/${require("../config/config").envType}.config`).winstonLevel;

const logger = createLogger({
  level: winstonLevel, // 设置日志级别，可选 'info', 'error', 'debug', 等
  format: format.combine(
    format.timestamp(), // 添加时间戳
    format.json() // 使用 JSON 格式记录日志
  ),
  transports: [
    new winston.transports.Console(),
    new transports.File({ filename: "logs/app_" + winstonLevel + ".log" }), // 将日志写入到 app.log 文件中
  ],
});

module.exports = logger;
