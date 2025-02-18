var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const morganLevel = require(`./config/${require("./config/config").envType}.config`).morganLevel;
const session = require('express-session')
const sessionSecret = require(`./config/${require("./config/config").envType}.config`).sessionSecret;
const session_cookie_expire_time = require(`./config/${require("./config/config").envType}.config`).session_cookie_expire_time;
const RedisStore = require("connect-redis").default;
const redisClient = require('./utils/redis')
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


/* Session默认存储在内存中，这里配置存储在redis中。这样的好处是服务端做集群时，依旧可以用session。
 * 使用seesion组件后，第一次请求服务端，会给客户端响应seesionId并写入到cookie中，客户端后续每次请求都会携带该sesionId在请求头。
 * 用户登录成功后，服务端的逻辑是把用户id存到内存的session池中，下一次请求，服务端会判断session池中是否有请求头中携带的seesionId，如有，则识别为已登录，其实和tomcat相似。
 * Session在本项目中未用到，现在推荐使用JWT，自己把用户验证信息写到请求头，服务端针对每次请求都解码/解密校验一遍。
 */
/* BEGIN  引入session和解析cookie的模块(如使用JWT做存API开发，可以把下面几行注释掉)  BEGIN  */
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 保存session_id de cookie设置
      maxAge: session_cookie_expire_time, // 过期时间，单位是毫秒
      secure: false, // 为true时，只有https协议才会收发cookie
    },
  })
);
// 解析cookie
app.use(cookieParser());
/* END  引入session和解析cookie的模块(如使用JWT做存API开发，可以把下面几行注释掉)  END  */


/* BEGIN  前后端不分离项目(使用模板引擎)组件引入(做纯后端API开发时，下面这几行可以注释掉)  BEGIN  */
app.engine("art", require("express-art-template")); // view engine setup
app.set("view options", {
  //art-template配置项，参考 https://aui.github.io/art-template/docs/options.html
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");

/*
 * 指定静态资源文件的位置，为public文件夹下面的静态资源文件如js/css/gif等加上路由前缀/public
 * /public：表示当用户访问以 /public 开头的 URL 时，Express 会查找 public 目录下的文件。
 * express.static(path.join(__dirname, "public"))：这是 Express 的静态文件中间件，它会将 public 目录下的文件暴露为静态资源，用户可以通过 URL 访问这些文件。
 * index: "index.html"：这个配置告诉 Express，当访问 /public 目录本身时（即访问 /public/），如果目录下有 index.html 文件，就自动返回这个文件，而无需用户手动指定文件名（例如，/public/index.html）。
 */
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    index: "index.html",
  })
);

//解决layui.js通过layui.use('layer')来引入layer.js的路径错误的bug，这是该UI框架自身的bug（改源码太麻烦，有正则表达式，不好改，直接加一条路由，简单粗暴）
app.use(
  "/lay/modules",
  express.static(path.join(__dirname, "public/lib/layui-v2.5.5/lay/modules"))
);

/* END  前后端不分离项目(使用模板引擎)组建引入(做纯后端API开发时，下面这几行可以注释掉)  END  */


// 这一条根路由的前两条子路由为了渲染layUI-admin的界面作为展示，参考6～22行
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
