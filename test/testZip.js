const fs = require('fs');
const archiver = require('archiver');

// 要压缩的文件夹路径
const folderPath = './uploads';

// 创建一个可写流，用于将ZIP文件写入磁盘
const output = fs.createWriteStream('my_folder.zip');

// 创建一个archiver实例，用于压缩文件夹
const archive = archiver('zip', {
  zlib: { level: 9 } // 压缩级别，0-9，9为最高级别
});

// 将可写流连接到archiver实例
archive.pipe(output);

// 添加文件夹到压缩包
archive.directory(folderPath, false); // 第二个参数设置为false，表示不在ZIP文件中包含文件夹名称

// 完成压缩操作
archive.finalize();

// 监听压缩完成事件
output.on('close', () => {
  console.log('文件夹已成功压缩成ZIP文件。');
});

// 处理错误
archive.on('error', (err) => {
  console.error('压缩过程中出现错误：', err);
});
