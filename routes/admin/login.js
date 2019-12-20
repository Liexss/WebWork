const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = require('../../utils/auth');
const secret = require('../../utils/config').secrept_jwt;
const decrypt = require('../../utils/crypto').decrypt;
const { searchuserHandler, selNameById } = require('../../models/db_mysqluser');

// 身份认证
router.get('/', auth, async (req, res) => {
  let doc = await selNameById({user_id: req.curuser_id});
  let user_name = doc.result[0].user_name;
  res.send({ result: 1, msg: `欢迎，${user_name}！`, user_name });
});

// 登录表单校验
router.post('/verify', async (req, res) => {
  let { user_id, pwd } = req.body;
  console.log(req.body)

  // 用户是否存在
  let doc = await searchuserHandler({ user_id, type: 0 });
  console.log(`存在用户：${JSON.stringify(doc)}`)

  if (doc.result.length) {
    // 密码是否正确
    const r = await decrypt(pwd, doc.result[0].salt);
    if (r !== doc.result[0].password) res.send({ result: 0, msg: '用户名或密码错误！' });
    else {
      // 密码正确jwt生成token
      const t = jwt.sign({ user_id, pwd: r }, secret, { expiresIn: 60 * 15 });
      console.log('token: ' + t)

      res.send({ result: 1, msg: '登录成功！', token: t });
    }
  } else {
    res.send({ result: 0, msg: '用户名或密码错误！' });
  }
});

module.exports = router;
