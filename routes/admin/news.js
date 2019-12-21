const express = require('express');
const router = express.Router();

const { selnewsSql, addnewsSql, updatenewsSql, deletenewsSql, selupdateSql } = require('../../models/admin/sql_news');
const { selNameById } = require('../../models/db_mysqluser');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
  console.log(req.body)
  let reqData = req.body;
  let sqlData = {};
  reqData.forEach(v => {
    sqlData[v.key] = v.value;
  });
  console.log(sqlData)

  // 文章查询
  let data = await selnewsSql(sqlData);
  console.log('查询到的文章：' + data.length + '篇')
  res.send({ result: 1, data, msg: `查询成功！` });
});

router.post('/add', auth, async (req, res) => {
  let { title, type, content, raw } = req.body;

  // 文章title查重
  let doc = await selnewsSql({ news_name: title });
  console.log('已存在文章：' + JSON.stringify(doc))
  if (doc.length) return res.send({ result: 0, msg: '标题重复！' });

  // 用户名查询
  let namedoc = await selNameById({ user_id: req.curuser_id });
  let user_name = namedoc.result[0].user_name;

  // 添加文章
  let r = await addnewsSql({ news_name: title, type, news_content: content, news_raw: raw, user_id: req.curuser_id, user_name });
  if (r.result === 1) res.send({ result: 1, msg: '添加成功！' });
  else res.send({ result: 0, msg: '添加失败！' });
});

router.post('/update', auth, async (req, res) => {
  let { title, type, content, raw, news_id } = req.body;

  // 文章title查重
  let doc = await selupdateSql({ news_name: title }, news_id);

  console.log('已存在文章：' + JSON.stringify(doc))
  if (doc.length) return res.send({ result: 0, msg: '标题重复！' });

  // 用户名查询
  let namedoc = await selNameById({ user_id: req.curuser_id });
  let user_name = namedoc.result[0].user_name;

  // 更新文章
  let set = { news_name: title, type, news_content: content, news_raw: raw, user_id: req.curuser_id, user_name };
  let where = { news_id };
  let r = await updatenewsSql(set, where);
  if (r.result === 1) res.send({ result: 1, msg: '更新成功！' });
  else res.send({ result: 0, msg: '更新失败！' });
});

router.post('/delete', auth, async (req, res) => {
  let { news_id } = req.body;
  console.log(req.body)

  let r = await deletenewsSql({ news_id });
  if (r.result === 1) res.send({ result: 1, msg: '删除成功！' });
  else res.send({ result: 0, msg: '删除失败！' });
});

module.exports = router;
