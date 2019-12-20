const pool = require('../db_mysqlconfig') //引入上面所讲的数据库基础配置

// 增添文章
const addnewsSql = async (vals) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log("连接失败");

    connection.beginTransaction(err => {
      if (err) reject('开启事务失败');
      vals.create_time = vals.update_time = newDate();
      console.log(vals)
      connection.query(`insert into news set ?`, vals, (e, rows) => {
        if (e) return connection.rollback(() => {
          console.log('插入失败数据回滚');
        });
        connection.commit(error => {
          if (error) console.log('事务提交失败');
          connection.release();
          resolve({ rows, result: 1 });
        });
      });
    });
  });
}).catch(error => { console.log(error) });

// 格式化生成当前时间
function newDate(t = new Date()) {
  return [t.getFullYear(), t.getMonth() + 1, t.getDate()].join('-');
}

// 文章查询
const selnewsSql = async vals => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log('连接失败');

    connection.query(`select * from news where ?`, vals, (e, doc) => {
      e && console.log('查询失败');
      connection.release();
      resolve(doc);
    })
  })
}).catch(error => console.log(error));

// 更新文章
const updatenewsSql = async (set, where) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log("连接失败");

    connection.beginTransaction(err => {
      if (err) reject('开启事务失败');
      set.update_time = newDate();
      
      connection.query(`update news set ? where ?`, [set, where], (e, rows) => {
        if (e) return connection.rollback(() => {
          console.log('插入失败数据回滚');
        });
        connection.commit(error => {
          if (error) console.log('事务提交失败');
          connection.release();
          resolve({ rows, result: 1 });
        });
      });
    });
  });
}).catch(error => console.log(error));

module.exports = {
  addnewsSql,
  selnewsSql,
  updatenewsSql,
}
