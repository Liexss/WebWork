var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const secret = require("../utils/config").secrept_jwt;
const auth = require("../utils/auth");
const User = require("../models/db_mysqluser");
const render = require("../utils/render").indexRender;
var client = require('../models/db_redisconfig.js');
/* GET index page. */
router.get("/", function(req, res) {
  res.redirect("/signin");
});
router.post("/token", async(req, res) =>{
  var t = req.body.token;
  //console.log(t)

  if (t) {
    client.get(t, (err, reply) => {
      console.log('redis: ' + reply)
      // 存在则刷新redis中的有效时间
      if (reply) client.expire(t, 60*15);
      else return res.send({ token: false, msg: "Invalid token" });
    });
    jwt.verify(t, secret, async(err, decoded) => {
      //console.log("jwt: " + JSON.stringify(decoded));
      if (err) {
        //console.log("jwt: Invalid token");
        //token已过期或不存在
        //res.send({ result: 0, msg: "Invalid token" });
        res.send({token:false});
        res.end();
      } else {
        //token仍在有效刷新期
        //console.log(decoded.usr);
        let docuser=await User.showusercollegeHandler({user_id:decoded.usr});
        console.log(docuser.result[0]);
        res.send({token:true,user:docuser.result[0]});
        res.end();
      }
    });
  } else {
    //请求无token
    //console.log("jwt: No token");
    res.send({token:false});
    res.end();
  }
});
module.exports = router;
