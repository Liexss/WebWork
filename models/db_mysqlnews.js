const pool = require('./db_mysqlconfig') //引入上面所讲的数据库基础配置
const selnewsHandler = async vals => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log('连接失败');
  
      connection.query(`select * from news where type=? and is_post= 0 order by update_time desc limit ?`, [vals.type,vals.num], (e, doc) => {
        e && console.log('查询失败');
        connection.release();
        resolve(doc);
      })
    })
}).catch(error => console.log(error));
module.exports = {
  selnewsHandler
};