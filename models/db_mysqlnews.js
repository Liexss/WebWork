const pool = require('./db_mysqlconfig') //引入上面所讲的数据库基础配置
const selCollegenewsfourHandler = async vals => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log('连接失败');
  
      connection.query(`select * from news where type='师大要闻' and is_post= 0 order by update_time desc limit 4`, vals, (e, doc) => {
        e && console.log('查询失败');
        connection.release();
        resolve(doc);
      })
    })
}).catch(error => console.log(error));
const selNoticeeightHandler = async vals => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log('连接失败');
  
      connection.query(`select * from news where type='通知公告' and is_post= 0 order by update_time desc limit 8`, vals, (e, doc) => {
        e && console.log('查询失败');
        connection.release();
        resolve(doc);
      })
    })
}).catch(error => console.log(error));
module.exports = {
    selCollegenewsfourHandler,
    selNoticeeightHandler
};