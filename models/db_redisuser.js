const client = require('./db_redisconfig') //引入上面所讲的数据库基础配置

const inserttokenHandler = async (vals) =>new Promise((resolve, reject) =>  {
     client.set(vals.token,1, function (err, data) {
         console.log(err);
     })
     client.expire(vals.token,60*20);
    //rclient.set('key','1');//赋值
    //rclient.expire('key',60);//60秒自动过期
})

const searchtokenHandler = async (vals) =>new Promise((resolve, reject) =>  {

})
const updatetokenHandler = async (vals) =>new Promise((resolve, reject) =>  {

})





module.exports = {
  inserttokenHandler,
  searchtokenHandler,
  updatetokenHandler
}