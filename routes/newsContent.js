var express = require("express");
var router = express.Router();

const auth = require("../utils/auth");
const render = require("../utils/render").NewsContentRouter;
const News = require("../models/db_mysqlnews");
router.get("/", async (req, res) => {
    var news_id = req.query.news_id;
    let docnews = await News.shownewsHandler({ id: news_id });
    let doccomment=await News.showCommentsHandler({id:news_id});
    if(docnews[0].type=='师大要闻'){
        docnews[0]['msg']='Collegenav';
    }
    else if(docnews[0].type=='党建文化'){
        docnews[0]['msg']='Partynav';
    }
    else if(docnews[0].type=='媒体师大'){
        docnews[0]['msg']='Medianav';
    }
    else if(docnews[0].type=='教学科研'){
        docnews[0]['msg']='Teachenav';
    }
    else if(docnews[0].type=='学术研究'){
        docnews[0]['msg']='Learnnav';
    }
    else if(docnews[0].type=='通知公告'){
        docnews[0]['msg']='Noticenav';
    }
    console.log(doccomment);
    res.render("layout", {
        layout: "newsContent",
        news:docnews[0],
        comment:doccomment
    });
});

module.exports = router;
