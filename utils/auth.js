const jwt = require("jsonwebtoken");
const { tokenSecrept, shortExpiresIn } = require("./config");
var client = require('../models/db_redisconfig.js');

module.exports = function (req, res, next) {
  var t = req.headers.authorization;
  // console.log(t)

  if (t) {
    // 先去redis里找token
    client.get(t, (err, reply) => {
      console.log('redis: ' + reply)
      // 存在则刷新redis中的有效时间
      if (reply) client.expire(t, shortExpiresIn);
      else return res.send({ result: 0, msg: "Invalid token" });
    });
    jwt.verify(t, tokenSecrept, (err, decoded) => {
      console.log('jwt: ' + JSON.stringify(decoded))
      if (err) {
        console.log('jwt: Invalid token');
        //token已过期或不存在
        res.send({ result: 0, msg: "Invalid token" });
      } else {
        //token仍在有效刷新期
        req.curuser_id = decoded.user_id;
        next();
      }
    });
  } else {
    //请求无token
    console.log('jwt: No token')
    res.send({ result: 0, msg: 'No token' });
  }
};
