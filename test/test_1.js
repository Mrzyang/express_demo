const fs = require('fs');

try {
  // 同步读取文件内容
  const content = fs.readFileSync('example.txt', 'utf-8');
  console.log('File content:', content);
} catch (error) {
  //console.error('Error reading file:', error);
}
