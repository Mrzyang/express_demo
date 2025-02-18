const jwt = require("jsonwebtoken");
const { promisify } = require("util");

let jwtSign = (payload, jwtSecret, jwt_token_expire_time, callback) => {
  const options = {
    expiresIn: jwt_token_expire_time, // token 过期时间，单位可以是毫秒，也可以是描述时间长度的字符串；这里设置的是一小时
  };

  jwt.sign(payload, jwtSecret, options, (err, token) => {
    if (err) {
      callback(err);
    } else {
      callback(null, token);
    }
  });
};

// jwtSign(payload, (err, token) => {
//   if (err) {
//     console.error("签名时出错：", err);
//   } else {
//     console.log("生成的 token：", token);
//   }
// });

let jwtVerify = (token ,jwtSecret, callback) => {
  const options = {};
  jwt.verify(token, jwtSecret, options, (err, decoded) => {
    if (err) {
      callback(err);
    } else {
      callback(null, decoded);
    }
  });
};

// jwtVerify(token, (err, decoded) => {
//   if (err) {
//     console.error("验证时出错：", err);
//   } else {
//     console.log("验证通过，解码数据：", decoded);
//   }
// });

exports.sign = promisify(jwtSign);
exports.verify = promisify(jwtVerify);
exports.decode = promisify(jwt.decode);