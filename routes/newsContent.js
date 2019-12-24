var express = require("express");
var router = express.Router();
const auth = require("../utils/auth");
const render = require("../utils/render").NewsContentRouter;
const News = require("../models/db_mysqlnews");
const jwt = require("jsonwebtoken");
const secret = require("../utils/config").secrept_jwt;
var client = require('../models/db_redisconfig.js');
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
router.get("/", async (req, res) => {
    var news_id = req.query.news_id;
    if(news_id == null){
        res.send('404');
    }
    let changenew = await News.updatenewsHandler({news_id:news_id}); 
    let docnews = await News.shownewsHandler({ id: news_id });
    let doccomment = await News.showCommentsHandler({ id: news_id });
    if (docnews[0].type == '师大要闻') {
        docnews[0]['msg'] = 'Collegenav';
    }
    else if (docnews[0].type == '党建文化') {
        docnews[0]['msg'] = 'Partynav';
    }
    else if (docnews[0].type == '媒体师大') {
        docnews[0]['msg'] = 'Medianav';
    }
    else if (docnews[0].type == '教学科研') {
        docnews[0]['msg'] = 'Teachenav';
    }
    else if (docnews[0].type == '学术研究') {
        docnews[0]['msg'] = 'Learnnav';
    }
    else if (docnews[0].type == '通知公告') {
        docnews[0]['msg'] = 'Noticenav';
    }
    //console.log(docnews[0]);
    res.render("layout", {
        layout: "newsContent",
        news: docnews[0],
        comment: doccomment
    });
});
router.post("/comment", async (req, res) => {
    // var t = req.body;
    // console.log(t);
    var t = req.body.token;
    if (t) {
        client.get(t, (err, reply) => {
            //console.log('redis: ' + reply)
            // 存在则刷新redis中的有效时间
            if (reply) client.expire(t, 60 * 15);
            else return res.send({ token: false, msg: "Invalid token" });
        });
        jwt.verify(t, secret, async (err, decoded) => {
            if (err) {
                res.send({ token: false });
                res.end();
            } else {
               // console.log(new Date().Format("yyyy-MM-dd"));
                let doc = await News.InsertCommentsHandler({ news_id: req.body.news_id, comment_content: req.body.content, user_id: decoded.usr, comment_time: new Date().Format("yyyy-MM-dd") });
                //console.log(doc);
                if (doc.success == true) {
                    res.send({ token: true, insert: true });
                    res.end();
                }
                else {
                    res.send({ token: true, insert: false });
                    res.end();
                }
            }
        });
    } else {
        res.send({ token: false });
        res.end();
    }
});
module.exports = router;
