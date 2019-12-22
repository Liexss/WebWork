var express = require("express");
var router = express.Router();

const auth = require("../utils/auth");
const render = require("../utils/render").NewsRouter;
const News = require("../models/db_mysqlnews");
router.get("/", async (req, res) => {
  let Medianew = await News.selnewsHandler({ type: "媒体师大", num: 6 });
  let Teachenew = await News.selnewsHandler({ type: "教学科研", num: 3 });
  let Learnnew = await News.selnewsHandler({ type: "学术研究", num: 4 });
  let Noticenew = await News.selnewsHandler({ type: "通知公告", num: 4 });
  res.render("layout", {
    layout: "news",
    title: "杭师大主页",
    Medianew: Medianew,
    Teachenew: Teachenew,
    Learnnew: Learnnew,
    Noticenew: Noticenew
  });
});

module.exports = router;
