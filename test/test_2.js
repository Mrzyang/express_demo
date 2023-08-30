// const envType = require('../config/config').envType

const config = require(`../config/${require('../config/config').envType}.config`);

// console.log("envType=", envType)

console.log(config)