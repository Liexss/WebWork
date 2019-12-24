var express = require("express");
var router = express.Router();

const render = require("../utils/render").PersonalpasRouter;
const News = require("../models/db_mysqlnews");
const jwt = require("jsonwebtoken");
const User = require("../models/db_mysqluser");
const secret = require("../utils/config").secrept_jwt;
var client = require('../models/db_redisconfig.js');
const decrypt = require("../utils/crypto").decrypt;
router.get("/", async (req, res) => {
    res.render("layout", {
        layout: "personalpas"
      });
});
router.post("/check", async (req, res) => {
  // var t = req.body;
  // console.log(t);
  console.log(req.body);
  var t = req.body.token;
  if (t) {
    client.get(t, (err, reply) => {
      console.log('redis: ' + reply)
      // 存在则刷新redis中的有效时间
      if (reply) {
        client.expire(t, 60*15);
        jwt.verify(t, secret, async(err, decoded) => {
          if (err) {
            res.send({token:false});
            res.end();
          } else {
            if(req.body.pwd!==req.body.rpwd||req.body.pwd==""){
              res.send({token:true,change:false,msg:'两次密码输入不一致'});
              res.end();
            }
            else if(!/^\w{6,15}$/.test(req.body.pwd)){
              res.send({token:true,change:false,msg:'新密码格式有误'});
              res.end();
            }
            else{
              const doc = await User.searchexisuserHandler({ user_id: decoded.usr, is_post: 0 });
              const r = await decrypt(req.body.fpwd, doc.result[0].salt);
              if(r!==doc.result[0].password){
                res.send({token:true,change:false,msg:'原密码不一致'});
                res.end();
              }
              else{
                const ww=await decrypt(req.body.pwd,doc.result[0].salt);
                let update=await User.updateuserpasHandler({user_id:decoded.usr,password:ww});
                res.send({token:true,change:true,msg:'修改成功'});
              }
            }
            // let docuser=await User.showusercollegeHandler({user_id:decoded.usr});
            // console.log(docuser.result[0]);
            // res.send({token:true,user:docuser.result[0]});
            // res.end();
          }
        });
      }
      else {
        res.send({ token: false, msg: "Invalid token" });
        res.end();
      }
    });
  } else {
    res.send({token:false});
    res.end();
  }
});
module.exports = router;
