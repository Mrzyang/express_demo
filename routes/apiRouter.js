var express = require('express');
var router = express.Router();

// 定义路由模块
var userRouter = require('./api/userRouter')
var homeRouter = require('./api/homeRouter')
var fileRouter = require('./api/fileRouter')

// 挂载路由到请求路径,分不同模块指定前缀路径
router.use('/user', userRouter);
router.use('/home', homeRouter);
router.use('/file', fileRouter)

// 根路径请求测试
router.get('/', function(req, res, next) {
    res.send('responded by apiRouter');
  });

module.exports = router;
