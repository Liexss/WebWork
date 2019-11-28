const express = require('express');
const router = express.Router();
const url = require('url');
const jwt = require('jsonwebtoken');
const decrypt = require('../utils/crypto').decrypt;
const render = require('../utils/render').signinRender;
const secret = require('../utils/config').secrept_jwt;

/* GET signin page. */
router.get('/', (req, res) => {
  render.get(res)
});

router.get('/verify', async (req, res) => {
  let { email, pwd } = url.parse(req.url, true).query;
  console.log(JSON.stringify(url.parse(req.url, true).query))

  // 用户查询
  const User = require('../models/db_user');
  const doc = await  User.searchuserHandler({user_id:email});
  console.log(doc.result[0].user_id);
  // 登录检测
  if (Object.keys(doc.result).length!=0) {
    const r = await decrypt(pwd,doc.result[0].salt);
    console.log('r:' + r)
    if (r !== doc.result[0].password) render.err(res, '密码错误！')
    else {
      const t = jwt.sign({ email, pwd: r }, secret, { expiresIn: 60 })
      console.log('token:' + t)
      res.send({ result: 1, msg: '登录成功', token: t })
    }
  } else {
    res.send({ result: 0, msg: '用户不存在！' })
  }
});

module.exports = router;
