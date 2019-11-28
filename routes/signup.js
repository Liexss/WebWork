const express = require('express');
const router = express.Router();
const render = require('../utils/render').signupRender;
const encrypt = require('../utils/crypto').encrypt;

/* GET signup page. */
router.get('/', (req, res) => {
  render.get(res)
});

// 处理表单请求
router.post('/', async (req, res) => {
  let { email, pwd, rpwd } = req.body;
  console.log(JSON.stringify(req.body))

  // 表单验证
  const reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/;
  if (!reg.test(email)) return render.err(res, '邮箱格式有误！');
  if (!/^\w{6,15}$/.test(pwd)) return render.err(res, '密码格式有误！');
  if (pwd !== rpwd) return render.err(res, '密码不一致！');

  // 用户查重
  const User = require('../models/db_user');
  let doc =await  User.searchuserHandler({user_id:email});
  //console.log(doc);
  if (Object.keys(doc.result).length!=0) return render.err(res, '用户已存在！');

  // pwd加密
  let { r, salt } = await encrypt(pwd);

  // 添加用户
  let insertUser=await User.insertuserHandler({user_id:email,password:r,salt:salt});
  if(insertUser.success==true){
     render.suc(res, '注册成功，请登录');
  }
 // console.log(insertUser);
});

module.exports = router;
