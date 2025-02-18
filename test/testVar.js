const user = {
    name: 'John',
    age: 30
  };
  
  for (let key in user) {
    // 使用 key 获取属性名称，user[key] 获取属性值
    console.log(`属性名称: ${key}, 属性值: ${user[key]}`);
  }
  
  // 使用 Object.keys() 获取对象的属性名称数组，然后使用 length 获取属性个数
  const numberOfProperties = Object.keys(user).length;
  
  console.log(`对象中属性的个数为: ${numberOfProperties}`);
  

const valuesArray = Object.values(user);
console.log(valuesArray);
