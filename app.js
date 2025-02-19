var createError = require("http-errors");
var express = require("express");
const morganLevel = require(`./config/${require("./config/config").envType}.config`).morganLevel;
var morgan = require("morgan");
var indexRouter = require("./routes/indexRouter");
var apiRouter = require("./routes/apiRouter");
const logger = require("./utils/logger");
const cors = require("cors");

var app = express();

/* 备注： 本项目完成了两种身份信息验证方式:
 * 1.前后端分离项目用单jwt+redis+滑动续期jwt和redis，可以实现用户已登录状态永不过期。
 * 2.微信小程序用jwt accessToken + refreshToken，当refreshToken已过期后accessToken又过期，那么用户只能重新登录了。
 */

// morgan组建的作用时控制台打印每一次请求的详细路径等信息
app.use(morgan(morganLevel));
// 解析post请求raw类型的json报文  application/json
app.use(express.json());
// 解析post请求 application/x-www-form-urlencoded类型的报文， 需要支持传统表单提交时需要将extended设置为true
app.use(express.urlencoded({ extended: false }));


// 根路由，里面写了很多测试案例
app.use("/", indexRouter);

// 使用 cors 中间件，只允许 /api 和 /api/ 开头的请求进行跨域请求。本地前后端联调时临时设置一下允许跨域，免得还要开一个nginx反向代理，挺麻烦的。
app.use(
  cors({
    origin: [/^\/api($|\/)/, /\/abc($|\/)/], // 正则表达式匹配路径
  })
);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  //自定义404
  //res.status(404).send('404 Not Found')
});

// error handler 在所有中间件之后挂载错误处理中间件
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500).render("error", { errorMessage: err.message });
  //res.status(err.status || 500).json({"error": err.message})
  //以下是自定义错误中间件逻辑，winston 记录错误日志
  logger.error(err);
});

const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
