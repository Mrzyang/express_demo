const Redis = require('ioredis');
const config = require(`../config/${require('../config/config').envType}.config`).redisConnectionConfig;

const redis = new Redis(config);
  
module.exports = redis;