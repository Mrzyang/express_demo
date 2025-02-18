exports.cors = (req, res, next) => {
  // 允许所有来源
  res.header("Access-Control-Allow-Origin", "*");
  // 允许特定 HTTP 方法
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // 允许特定标头
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 执行你的路由处理逻辑
  next();
};
