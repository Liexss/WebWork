const express = require('express');
const router = express.Router();
const {
  insertArticleHandler,
  searchArticleHandler,
} = require('../../models/db_mysqlarticle');

router.post('/add', async (req, res) => {
  // console.log(req.body)
  let { title, type, html, raw } = req.body;

  // 文章title查重
  let doc = await searchArticleHandler({ title });
  console.log('doc:' + JSON.stringify(doc))
  if (doc.length) return res.send({ status: 0, msg: '文章已存在！' });

  // 添加文章
  let result = await insertArticleHandler({ title, type, html, raw });
  if (result.status = 'success') res.send({ status: result.status, msg: '添加文章成功！' });
  else res.send({ status: 'error', msg: '文章添加失败！' })
});

module.exports = router;
