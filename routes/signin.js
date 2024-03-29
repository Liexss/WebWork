const express = require("express");
const router = express.Router();
const url = require("url");
const jwt = require("jsonwebtoken");
const decrypt = require("../utils/crypto").decrypt;
const render = require("../utils/render").signinRender;
const { tokenSecrept, expiresIn, shortExpiresIn } = require('../utils/config');
var client = require('../models/db_redisconfig.js');

/* GET signin page. */
router.get("/", (req, res, next) => {
  res.render("layout", { layout: "hznusignin", title: "Hznu Sign In" });
});

router.get("/verify", async (req, res) => {
  let { usr, pwd } = url.parse(req.url, true).query;
  console.log(JSON.stringify(url.parse(req.url, true).query));

  // 用户查询
  const User = require("../models/db_mysqluser");
  const doc = await User.searchexisuserHandler({ user_id: usr, is_post: 0 });
  //console.log(doc.result[0].user_id);
  //console.log(doc);
  // 登录检测
  if (Object.keys(doc.result).length != 0) {
    const r = await decrypt(pwd, doc.result[0].salt);
    //console.log('r:' + r)
    if (r !== doc.result[0].password) render.err(res, "密码错误！");
    else {
      const t = jwt.sign({ usr, pwd: r }, tokenSecrept, { expiresIn });
      // token存入redis
      client.set(t, 1);
      client.expire(t, 60 * 15);
      // console.log("token:" + t);
      res.send({
        result: 1,
        msg: "登录成功",
        admin: doc.result[0].user_id,
        token: t
      });
    }
  } else {
    res.send({ result: 0, msg: "用户不存在！" });
  }
});

module.exports = router;
