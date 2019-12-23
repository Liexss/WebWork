const pool = require("../db_mysqlconfig"); //引入上面所讲的数据库基础配置

// 用户查询
const seluserSql = async () =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      let sql = `select * from user a left join college b on a.college_id=b.college_id where a.type=1`;
      connection.query(sql, (e, data) => {
        e && console.log("用户查询失败");
        connection.release();
        resolve({ result: 1, data });
      });
    });
  }).catch(error => console.log(error));

// 删除用户
const deleteuserSql = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.beginTransaction(err => {
        if (err) reject("开启事务失败");

        connection.query(`delete from user where ?`, vals, (e, rows) => {
          if (e)
            return connection.rollback(() => {
              console.log("删除失败数据回滚");
              resolve({ result: 0 });
            });
          connection.commit(error => {
            if (error) console.log("事务提交失败");
            connection.release();
            resolve({ result: 1 });
          });
        });
      });
    });
  }).catch(error => console.log(error));

  // 增添用户
const adduserSql = async vals =>
new Promise((resolve, reject) => {
  console.log(vals)
  pool.getConnection((err, connection) => {
    err && console.log("连接失败");

    connection.beginTransaction(err => {
      if (err) reject("开启事务失败");
      connection.query(`insert into user set ?`, vals, (e, rows) => {
        if (e)
          return connection.rollback(() => {
            console.log("插入失败数据回滚");
            resolve({ result: 0 });
          });
        connection.commit(error => {
          if (error) console.log("事务提交失败");
          connection.release();
          resolve({ result: 1 });
        });
      });
    });
  });
}).catch(error => { console.log(error); });

module.exports = {
  seluserSql,
  deleteuserSql,
  adduserSql,
};
