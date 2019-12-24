const express = require("express");
const router = express.Router();

const { seluserSql, deleteuserSql, adduserSql } = require('../../models/admin/sql_user');
const { selallcollegeSql } = require('../../models/admin/sql_college');
const encrypt = require('../../utils/crypto').encrypt;
const auth = require('../../utils/auth');

router.get('/', auth, async (req, res) => {
  let r = await seluserSql();
  if (r.result === 1) res.send({ result: 1, data: r.data });
  else res.send({ result: 0 });
});

router.post('/delete', auth, async (req, res) => {
  let { user_id } = req.body;

  let r = await deleteuserSql({ user_id });
  if (r.result === 1) res.send({ result: 1, msg: "删除成功！" });
  else res.send({ result: 0, msg: "删除失败！" });
});

router.post('/add', auth, async (req, res) => {
  let { password, ...other } = req.body;
  console.log(req.body);

  //pwd加密
  let rencrypt = await encrypt(password);
  let { salt } = rencrypt;

  let r = await adduserSql({ password: rencrypt.r, salt, ...other });
  if (r.result === 1) res.send({ result: 1, msg: "添加成功！" });
  else res.send({ result: 0, msg: "添加失败！" });
});

// 返回所有学院
router.get('/college', async (req, res) => {
  let r = await selallcollegeSql();
  if (r.result === 1) res.send({ result: 1, data: r.data });
  else res.send({ result: 0 });
});

module.exports = router;
