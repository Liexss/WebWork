var express = require('express');
var router = express.Router();

const auth = require('../utils/auth');
const render = require('../utils/render').indexRender;

/* GET index page. */
router.get('/', function (req, res) {
  res.render('layout', {layout: 'index',usr:'???'});
});

router.get('/usr', auth, (req, res) => {
  console.log(req.currentUser)
  res.send({ usr: req.currentUser })
});


module.exports = router;
