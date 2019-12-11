const express = require('express');
const router = express.Router();
const {
  insertNewsHandler,
  searchNewsHandler,
} = require('../../models/db_mysqlnews');

router.post('/add', async (req, res) => {
  // console.log(req.body)
  user_id = '123';
  let { title, type, html, raw } = req.body;

  // 文章title查重
  let doc = await searchNewsHandler({ news_name: title });
  console.log('doc:' + JSON.stringify(doc))
  if (doc.length) return res.send({ status: 0, msg: '文章已存在！' });

  // 添加文章
  let result = await insertNewsHandler({ news_name: title, type, news_content: html, news_raw: raw, user_id });
  if (result.status = 'success') res.send({ status: result.status, msg: '添加文章成功！' });
  else res.send({ status: 'error', msg: '文章添加失败！' })
});

module.exports = router;
