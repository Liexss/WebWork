const express = require("express");
const router = express.Router();
const render = require("../utils/render").signupRender;
const encrypt = require("../utils/crypto").encrypt;
const User = require("../models/db_mysqluser");
/* GET signup page. */
router.get("/", async (req, res) => {
  // let doc =await User.searchuserHandler({user_id:1111111111});
  let collegedata = await User.showcollegeHandler();
  //console.log(collegedata.result);
  res.render("layout", {
    layout: "signup",
    title: "Sign up",
    college: collegedata.result
  });
});
async function reserr(res, text) {
  let collegedata = await User.showcollegeHandler();
  return res.render("layout", {
    layout: "signup",
    title: "Sign up",
    college: collegedata.result,
    msg: {
      text: text,
      status: "error"
    }
  });
}
// 处理表单请求
router.post("/", async (req, res) => {
  let collegedata = await User.showcollegeHandler();
  let { id, name, sellist1, college, pwd, rpwd } = req.body;
  //console.log(JSON.stringify(req.body));
  //console.log(res);

  if (!/^\w{1,10}$/.test(id)) return reserr(res, "用户名格式有误");
  if (!/^\w{1,8}$/.test(name)) return reserr(res, "姓名格式有误");
  if (!/^\w{6,15}$/.test(pwd)) return reserr(res, "密码格式有误");
  if (pwd !== rpwd) return reserr(res, "密码不一致");

  // 用户查重
  let doc = await User.searchexisuserHandler({ user_id: id, is_post: 0 });
  //console.log(doc);
  //console.log(Object.keys(doc.result).length);
  if (Object.keys(doc.result).length != 0) return reserr(res, "用户名已存在");

  //pwd加密
  let { r, salt } = await encrypt(pwd);

  // 添加用户
  let insertUser = await User.insertuserHandler({
    user_id: id,
    user_name: name,
    college_id: sellist1,
    password: r,
    salt: salt
  });
  //console.log(1);
  //console.log(insertUser);
  if (insertUser.success == true) {
    return res.render("layout", {
      layout: "signin",
      title: "Sign in",
      msg: {
        text: "注册成功",
        status: "success"
      }
    });
  }
  //console.log(insertUser);
});

module.exports = router;
