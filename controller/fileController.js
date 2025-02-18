const path = require("path");
const responseBody = require("../utils/utils").responseBody;

exports.upload = async (req, res, next) => {
  try {
    // 从请求中获取上传的文件信息
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json(responseBody(400, '请选择要上传的文件'));
    }
    // 如果需要，你可以在这里处理上传后的文件，例如保存到数据库或执行其他操作
    return res.json(responseBody(200, "文件上传成功", uploadedFile));
  } catch (error) {
    next(error);
  }
};

exports.download = async (req, res, next) => {
  try {
    // 获取要下载的文件名
    const filename = req.query.filename;
    console.log("filename=", filename);
    // 构建文件的绝对路径
    const filePath = path.join("uploads", filename); // 替换 'your_folder' 为存储文件的文件夹路径

    console.log("filepaht=", filePath);
    // 使用Express的res.download方法将文件发送给客户端
    return res.download(filePath, (err) => {
      if (err) {
        // 如果发生错误，你可以在这里处理错误，例如返回一个错误响应
        return res.status(404).json(responseBody(400, "文件不存在"));
      } else {
        // 文件成功发送
        console.log("文件下载成功");
      }
    });
  } catch (error) {
    next(error);
  }
};
