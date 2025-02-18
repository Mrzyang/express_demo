const uriString = "/page/welcome-1.html?t=1&v=1696074730645";

// 使用正则表达式匹配并截取中间的部分
const match = uriString.match(/\/(.*?)\.html\?/);

if (match && match[1]) {
  const middlePart = match[1];
  console.log(middlePart); // 打印中间的字符串
} else {
  console.log("未找到匹配的字符串");
}
