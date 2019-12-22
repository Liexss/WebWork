var express = require("express");
var router = express.Router();

const auth = require("../utils/auth");
const render = require("../utils/render").HomeRouter;

router.get("/", async (req, res) => {
  const News = require("../models/db_mysqlnews");
  let Collegenews = await News.selnewsHandler({ type: "师大要闻", num: 4 });
  let Notice = await News.selnewsHandler({ type: "通知公告", num: 8 });
  //console.log(Notice.slice(0,4));
  //console.log(Notice.slice(4,8));
  res.render("layout", {
    layout: "home",
    title: "杭师大主页",
    usr: "刘兴松",
    Collegenews: Collegenews,
    Notice1: Notice.slice(0, 4),
    Notice2: Notice.slice(4, 8)
  });
});

module.exports = router;
