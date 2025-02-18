const _ = require('lodash');

//推荐直接用isEmpty()方法，其包含了值为null 或 undefined的情况

 // 使用 _.isEmpty() 来检查变量是否为空（undefined、null、空字符串、空数组、空对象）
let myVariable = ''
if (_.isEmpty(myVariable)) {
    // 变量为空
    console.log("1 空")
  }

// 使用 _.isEmpty() 来检查对象是否为空
class MyObj {}
let myObject = new MyObj()
if (_.isEmpty(myObject)) {
  // 对象为空
  console.log("2 空")
}

// 使用 _.isNil() 来检查变量值是否为 null 或 undefined
let var_obj = undefined
if (_.isNil(var_obj)) {
    // 变量为空或未定义
    console.log("3 空")
  }