let responseBody = (code, message, data = {}) => {
  return {
    code: code,
    message: message,
    data: data,
  };
};

responseBody.ok = (data) => {
  return {
    code: 200,
    message: "操作成功",
    data: data,
  };
};

responseBody.failed = (data) => {
  return {
    code: 500,
    message: "操作失败",
    data: data,
  };
};