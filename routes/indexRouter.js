var express = require("express");
var router = express.Router();
const redis = require("../utils/redis");
const { query } = require("express-validator");

router.get("/", function (req, res, next) {
  return res.render("index");
});

router.get("/page/*", function (req, res, next) {
  // 使用路由参数来捕获 URL 的剩余部分
  const fullPath = req.originalUrl;
  // 发送路由全名作为响应
  // 使用正则表达式匹配并截取中间的部分
  const match = fullPath.match(/\/(.*?)\.html/);
  if (match && match[1]) {
    const middlePart = match[1];
    return res.render(middlePart);
  } else {
    return res.send("404 NOT FOUND.");
  }
});

// redis存储session测试
router.get('/set-session', (req, res) => {
  req.session.username = 'john_doe'; // 设置会话数据
  res.send('Session data set.');
});

router.get('/get-session', (req, res) => {
  const username = req.session.username; // 获取会话数据
  res.send(`Session data: ${username}`);
});

/* GET home page. */
router.get("/demo", function (req, res, next) {
  let title = "这里是标题";
  let students = [
    {
      name: "小明",
      gender: "男",
      age: 18,
    },
    {
      name: "小红",
      gender: "女",
      age: 20,
    },
  ];
  return res.render("demo", {
    title,
    students,
  });
});

/*
******************************************************************************
/* GET users listing. */
router.get("/testGet", function (req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  console.log("请求参数:", req.query);
  console.log("具体请求参数： ", "a = " + req.query.a, "    b = ", req.query.b);
  return res.send("responded by testRouter");
});

router.get("/testGetPathParams/:id", function (req, res, next) {
  let params_id = req.params.id;
  console.log("请求路径中的参数id=", params_id);
  return res.status(201).send("请求路径中的参数id=" + params_id, 200);
});

router.patch("/testGetPathParams2/:id/:name", function (req, res, next) {
  let params_id = req.params.id;
  console.log("请求路径中的参数id=", params_id);
  console.log("请求路径中的参数name=", req.params.name);
  return res.status(202).json({ foo: "bar" });
});

// 解析post请求 application/x-www-form-urlencoded类型的报文
router.post("/testPost", (req, res, next) => {
  let body = req.body;
  let name = body.name;
  let age = body.age;
  console.log("name=" + name + "  age=" + age);
  return res.send("这里是解析post类型请求的报文体");
});

// 解析post请求 raw  JSON类型的报文
router.post("/testRawJson", (req, res) => {
  // 从请求体中获取JSON参数
  const { name, age } = req.body;
  // 打印每个字段
  console.log("Name:", name);
  console.log("Age:", age);

  // 可以选择返回一个响应
  return res.json({ message: "数据已接收" });
});

router.get("/testAsync", async (req, res, next) => {
  try {
    return res.send("/test/testAsync");
  } catch (error) {
    next(error);
  }
});

router.get("/testRedis", async (req, res) => {
  try {
    const key = "name"; // 要读取的 Redis key 名称
    const value = await redis.get(key);

    if (value !== null) {
      return res.send(`Value of ${key}: ${value}`);
    } else {
      return res.send(`Key ${key} not found.`);
    }
  } catch (error) {
    console.error("Error reading key:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/testQueryValidator", query("person").notEmpty(), (req, res) => {
  return res.send(`Hello, ${req.query.person}!`);
});

module.exports = router;
