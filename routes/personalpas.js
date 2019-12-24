var express = require("express");
var router = express.Router();

const render = require("../utils/render").PersonalpasRouter;
const News = require("../models/db_mysqlnews");
const jwt = require("jsonwebtoken");
const User = require("../models/db_mysqluser");
const secret = require("../utils/config").secrept_jwt;
var client = require('../models/db_redisconfig.js');
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
          if (reply) client.expire(t, 60 * 15);
          else return res.send({ token: false, msg: "Invalid token" });
      });
      jwt.verify(t, secret, async (err, decoded) => {
          if (err) {
              res.send({ token: false });
              res.end();
          } else {
              // let doc = await News.InsertCommentsHandler({ news_id: req.body.news_id, comment_content: req.body.content, user_id: decoded.usr, comment_time: new Date().Format("yyyy-MM-dd") });
              // console.log(doc);
              // if (doc.success == true) {
              //     res.send({ token: true, insert: true });
              //     res.end();
              // }
              // else {
              //     res.send({ token: true, insert: false });
              //     res.end();
              // }
          }
      });
  } else {
      res.send({ token: false });
      res.end();
  }
});
module.exports = router;
