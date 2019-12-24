var express = require("express");
var router = express.Router();

const auth = require("../utils/auth");
const render = require("../utils/render").PersonalpasRouter;
const News = require("../models/db_mysqlnews");
const Page = require("../models/page");
router.get("/", async (req, res) => {
    res.render("layout", {
        layout: "personalpas"
      });
});

module.exports = router;
