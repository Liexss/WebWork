const express = require("express");
const router = express.Router();

const { seluserSql, deleteuserSql, adduserSql } = require('../../models/admin/sql_user');
const { selcollegeidbynameSql } = require('../../models/admin/sql_college');
const encrypt = require('../../utils/crypto').encrypt;

router.get('/', async (req, res) => {
  let r = await seluserSql();
  if (r.result === 1) res.send({ result: 1, data: r.data });
  else res.send({ result: 0 });
});

router.post('/delete', async (req, res) => {
  let { user_id } = req.body;

  let r = await deleteuserSql({ user_id });
  if (r.result === 1) res.send({ result: 1, msg: "删除成功！" });
  else res.send({ result: 0, msg: "删除失败！" });
});

router.post('/add', async (req, res) => {
  let { college_name, password, ...other } = req.body;
  console.log(req.body);

  // 学院id查询
  let rcollege = await selcollegeidbynameSql(college_name);
  if (rcollege.result !== 1) return res.send({ result: 0, msg: '学院不存在！' });
  let college_id = rcollege.data[0].college_id;

  //pwd加密
  let rencrypt = await encrypt(password);
  let { salt } = rencrypt;

  let r = await adduserSql({ college_id, password: rencrypt.r, salt, ...other });
  if (r.result === 1) res.send({ result: 1, msg: "添加成功！" });
  else res.send({ result: 0, msg: "添加失败！" });
});

module.exports = router;
