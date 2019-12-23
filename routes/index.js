var express = require("express");
var router = express.Router();

const auth = require("../utils/auth");
const render = require("../utils/render").indexRender;

/* GET index page. */
router.get("/", function(req, res) {
  res.redirect('/signin');
});

module.exports = router;
