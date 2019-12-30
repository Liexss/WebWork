const jwt = require("jsonwebtoken");
const { tokenSecrept, shortExpiresIn } = require("./config");
var client = require('../models/db_redisconfig.js');

module.exports = function (req, res, next) {
  var t = req.headers.authorization;
  // console.log(t)

  if (t) {
    // 先去redis里查token是否存在
    client.get(t, (err, reply) => {
      if (reply) {
        // 存在则刷新redis中的有效时间
        client.expire(t, shortExpiresIn);
        jwt.verify(t, tokenSecrept, (err, decoded) => {
          console.log('jwt: ' + JSON.stringify(decoded))
          if (err) {
            // 无效token
            res.send({ result: 0, msg: "Invalid token" });
          } else {
            // token有效
            req.curuser_id = decoded.user_id;
            next();
          }
        });
      } else res.send({ result: 0, msg: "Invalid token" });
    });

  } else {
    // token不存在
    res.send({ result: 0, msg: 'No token' });
  }
};
