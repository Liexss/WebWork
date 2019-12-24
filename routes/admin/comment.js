const express = require('express');
const router = express.Router();

const { showCommentsHandler } = require('../../models/db_mysqlnews');
const { deletecommentSql } = require('../../models/admin/sql_comment');

router.post('/', async (req, res) => {
  let { news_id } = req.body;

  let r = await showCommentsHandler({ id: news_id });
  res.send({ result: 1, data: r });
});

router.post('/delete', async (req, res) => {
  const { comment_id } = req.body;

  let r = await deletecommentSql({ comment_id });
  if (r.result === 1) res.send({ result: 1, msg: '删除成功！' });
  else res.send({ result: 0 , msg: '删除失败！'});
});

module.exports = router;
