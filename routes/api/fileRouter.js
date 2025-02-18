var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
// query:获取get请求URL参数; param: 获取get请求url路径中的参数;body:获取post请求参数
var fileController = require("../../controller/fileController");
const fileValidator = require("../../validator/fileValidator");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 上传的文件将保存在 'uploads/' 目录中
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), fileController.upload);
router.get("/download", fileValidator.download, fileController.download);

module.exports = router;
