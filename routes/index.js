var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const secret = require("../utils/config").secrept_jwt;
const auth = require("../utils/auth");
const render = require("../utils/render").indexRender;

/* GET index page. */
router.get("/", function(req, res) {
  res.redirect("/signin");
});
router.post("/token", function(req, res) {
  var t = req.body.token;
  //console.log(t)

  if (t) {
    jwt.verify(t, secret, (err, decoded) => {
      //console.log("jwt: " + JSON.stringify(decoded));
      if (err) {
        //console.log("jwt: Invalid token");
        //token已过期或不存在
        //res.send({ result: 0, msg: "Invalid token" });
        res.send({token:false});
        res.end();
      } else {
        //token仍在有效刷新期
        //console.log(decoded.usr);
        res.send({token:true,user_id:decoded.usr});
        res.end();
      }
    });
  } else {
    //请求无token
    //console.log("jwt: No token");
    res.send({token:false});
    res.end();
  }
});
module.exports = router;
