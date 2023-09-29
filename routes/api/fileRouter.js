var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
// query:获取get请求URL参数; param: 获取get请求url路径中的参数;body:获取post请求参数
const { query, body, param,validationResult } = require("express-validator");
var fileController = require("../../controller/fileController");

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
router.get(
  "/download/:filename",
  [param("filename").notEmpty().withMessage("要下载的文件名不能为空")],
  (req, res, next) => {
    // 检查验证错误
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 如果有验证错误，返回包含错误信息的 JSON 响应
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  fileController.download
);

module.exports = router;
