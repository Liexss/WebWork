var express = require("express");
var router = express.Router();

const auth = require("../utils/auth");
const render = require("../utils/render").NewsPartyListRouter;
const News = require("../models/db_mysqlnews");
const Page = require("../models/page");
router.get("/", async (req, res) => {
  let allLearn = await News.selAllnewsHandler({ type: "党建文化" });
  var con = {
    totalnum: allLearn.length,
    nowpagesize: 20,
    nowpagenum: 0
  };
  if (req.query.pagenum == null) {
    con.nowpagenum = 1;
  } else con.nowpagenum = req.query.pagenum;
  //console.log(con.nowpagenum);
  var pagedata = {
    nowPage: con.nowpagenum,
    pageNum: (con.totalnum + con.nowpagesize - 1) / con.nowpagesize
  };
  if (con.nowpagenum > pagedata.pageNum || con.nowpagenum < 0) {
    con.nowpagenum = 1;
    pagedata.nowPage = 1;
  }
  let LearnNew = await News.selRangenewsHandler({
    type: "党建文化",
    left: (pagedata.nowPage - 1) * con.nowpagesize,
    size: con.nowpagesize
  });
  //console.log(LearnNew);
  //console.log((pagedata.nowPage - 1) * con.nowpagesize);
  //console.log(pagedata.nowPage * con.nowpagesize);
  res.render("layout", {
    layout: "newsPartyList",
    paging: Page.Paging(pagedata),
    title: "党建文化",
    totnum: pagedata.pageNum,
    LearnNew: LearnNew,
    nowpage: pagedata.nowPage
  });
});

module.exports = router;
