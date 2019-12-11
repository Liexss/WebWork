const pool = require('./db_mysqlconfig') //引入上面所讲的数据库基础配置

// 增添文章
const insertNewsHandler = async (vals) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log("连接失败");
    const table = 'news';

    connection.beginTransaction(err => {
      if (err) reject('开启事务失败');
      vals.news_time = newDate();
      console.log(vals)
      connection.query(`insert into ${table} set ?`, vals, (e, rows) => {
        if (e) return connection.rollback(() => {
          console.log('插入失败数据回滚');
        });
        connection.commit(error => {
          if (error) console.log('事务提交失败');
          connection.release();
          resolve({ rows, status: 'success' });
        });
      });
    });
  });
});

// 文章title查重
const searchNewsHandler = async vals => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log('连接失败');
    const table = 'news';
    connection.query(`select * from ${table} where ?`, vals, (e, result) => {
      e && console.log('查询失败');
      connection.release();
      console.log(result)
      resolve(result);
    })
  })
});

module.exports = {
  insertNewsHandler,
  searchNewsHandler,
}

function newDate(t = new Date()) {
  return [t.getFullYear(), t.getMonth() + 1, t.getDate()].join('-');
}
