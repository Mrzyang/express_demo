var express = require("express");
var dbUtils = require("../utils/db");
const fs = require("fs");
var router = express.Router();

const mysqlGetConnection = require('../utils/mysql'); // 根据你的路径来引入 mysqlGetConnection 函数
const redis = require('../utils/redis')

const { query } = require('express-validator');

/* GET users listing. */
router.get("/testGet", function (req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);
  console.log("请求参数:", req.query);
  console.log("具体请求参数： ", "a = " + req.query.a, "    b = ", req.query.b);
  res.send("responded by testRouter");
});

router.get("/testGetPathParams/:id", function (req, res, next) {
  let params_id = req.params.id;
  console.log("请求路径中的参数id=", params_id);
  res.status(201);
  res.send("请求路径中的参数id=" + params_id, 200);
});

router.patch("/testGetPathParams2/:id/:name", function (req, res, next) {
  let params_id = req.params.id;
  console.log("请求路径中的参数id=", params_id);
  console.log("请求路径中的参数name=", req.params.name);
  res.status(202).json({ foo: "bar" });
});

router.get("/test", function (req, res, next) {
  console.log("请求路径是/test/test");
  res.status(201);
  res.cookie("name", "zhangyang");
  res.cookie("age", 18);
  res.write("hello ");
  res.write("world");
  res.end("  123");
});

router.post("/testPost", (req, res, next) => {
  let body = req.body;
  let name = body.name;
  let age = body.age;
  console.log("name=" + name + "  age=" + age);
  res.send("这里是解析post类型请求的报文体");
});

router.get("/testUtil", async function (req, res, next) {
  let dbContent = await dbUtils.getDb();
  console.log("读取的json文件内容是:", dbContent);
  res.json(dbContent);
});

router.get("/testErr", function (req, res, next) {
  try {
    // 同步读取文件内容
    const content = fs.readFileSync("example.txt", "utf-8");
    console.log("File content:", content);
    res.send("读取文件成功，未出现异常");
  } catch (error) {
    //console.error('Error reading file:', error);
    next(error);
  }
});

router.get("/testAsync", async (req, res, next) => {
  try {
    res.send("/test/testAsync");
  } catch (error) {
    next(error);
  }
});

router.get("/testMysql", async (req, res, next)=>{
  try {
    const connection = await mysqlGetConnection();
    connection.query('SELECT * FROM user', (err, results) => {
      connection.release(); // 释放连接回连接池
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Error fetching users' });
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Error getting connection:', error);
    res.status(500).json({ error: 'Error getting connection' });
  }
})

router.get('/testRedis', async (req, res) => {
  try {
    const key = 'name'; // 要读取的 Redis key 名称
    const value = await redis.get(key);

    if (value !== null) {
      res.send(`Value of ${key}: ${value}`);
    } else {
      res.send(`Key ${key} not found.`);
    }
  } catch (error) {
    console.error('Error reading key:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/testQueryValidator', query('person').notEmpty(), (req, res) => {
  res.send(`Hello, ${req.query.person}!`);
});

module.exports = router;
