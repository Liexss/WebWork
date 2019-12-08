const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  console.log(1)
  res.send('sdj')
});

module.exports = router;
