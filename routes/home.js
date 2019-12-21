var express = require('express');
var router = express.Router();

const auth = require('../utils/auth');
const render = require('../utils/render').HomeRouter;

/* GET index page. */
router.get('/', function (req, res) {
    res.render('layout', {
        layout: 'home',
        title: '杭师大主页',
        usr:"刘兴松"
    });
});


module.exports = router;
