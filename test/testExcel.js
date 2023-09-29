// https://github.com/exceljs/exceljs
const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('学生信息');

const studentData = [
  { name: '张三', age: 20, grade: 'A' },
  { name: '李四', age: 21, grade: 'B' },
  { name: '王五', age: 19, grade: 'A' },
  // 添加更多学生信息
];

worksheet.addRow(['姓名', '年龄', '成绩']);

studentData.forEach(student => {
  worksheet.addRow([student.name, student.age, student.grade]);
});

workbook.xlsx.writeFile('学生信息.xlsx')
  .then(() => {
    console.log('Excel 文件已生成');
  })
  .catch(err => {
    console.error('生成Excel文件时出错:', err);
  });
