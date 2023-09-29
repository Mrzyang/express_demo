var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const morganLevel = require(`./config/${require('./config/config').envType}.config`).morganLevel;
var morgan = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/apiRouter')
var testRouter = require('./routes/test');
var testPugViewRouter = require('./routes/testPugView');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan(morganLevel));
// 解析post请求raw类型的json报文  application/json
app.use(express.json());
// 解析post请求 application/x-www-form-urlencoded类型的报文
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 指定pug静态资源文件的位置
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter)
app.use('/test', testRouter);
app.use('/testPugView', testPugViewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  //自定义404
  //res.status(404).send('404 Not Found')
});

// error handler 在所有中间件之后挂载错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  //以下是自定义错误中间件逻辑
  // console.log("错误:", err);
  // res.status(500).json({error: err.message})
});

module.exports = app;
