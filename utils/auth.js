const jwt = require("jsonwebtoken");
const secret = require("./config").secrept_jwt;
// var client = require('../models/db_redisconfig.js');

module.exports = function(req, res, next) {
  var t = req.headers.authorization;
  console.log(t);

  if (t) {
    jwt.verify(t, secret, (err, decoded) => {
      console.log("decoded:" + JSON.stringify(decoded));
      if (err) {
        console.log(err);
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
    res.send({ result: 0, msg: "No token" });
  }
};
