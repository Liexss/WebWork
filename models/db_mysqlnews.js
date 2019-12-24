const pool = require("./db_mysqlconfig"); //引入上面所讲的数据库基础配置
const selnewsHandler = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.query(
        `select * from news where type=? and is_post= 0 order by update_time desc limit ?`,
        [vals.type, vals.num],
        (e, doc) => {
          e && console.log("查询失败");
          connection.release();
          resolve(doc);
        }
      );
    });
  }).catch(error => console.log(error));
const selAllnewsHandler = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.query(
        `select * from news where type=? and is_post= 0`,
        [vals.type],
        (e, doc) => {
          e && console.log("查询失败");
          connection.release();
          resolve(doc);
        }
      );
    });
  }).catch(error => console.log(error));
const selRangenewsHandler = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.query(
        `select * from news where type=? and is_post= 0 order by update_time desc limit ?,?`,
        [vals.type, vals.left, vals.size],
        (e, doc) => {
          e && console.log("查询失败");
          connection.release();
          resolve(doc);
        }
      );
    });
  }).catch(error => console.log(error));
const shownewsHandler = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");
      connection.query(
        `select a.news_id,a.type,a.news_name,a.news_content,a.news_focus,a.user_id,a.update_time,b.user_name,c.college_name from news as a left join user as b on a.user_id=b.user_id left join college as c on b.college_id=c.college_id where a.news_id=? and a.is_post= 0`,
        [vals.id],
        (e, doc) => {
          e && console.log("查询失败");
          connection.release();
          resolve(doc);
        }
      );
    });
  }).catch(error => console.log(error));
const showCommentsHandler = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");
      connection.query(
        `select * from comment a left join user b on a.user_id=b.user_id where news_id=? and a.is_post= 0 order by a.comment_time desc`,
        [vals.id],
        (e, doc) => {
          e && console.log("查询失败");
          connection.release();
          resolve(doc);
        }
      );
    });
  }).catch(error => console.log(error));
const InsertCommentsHandler = async vals =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("连接失败");
      }
      const tablename = "comment"; //动态table(表)名称
      //开启事务
      connection.beginTransaction(err => {
        if (err) {
          return "开启事务失败";
        } else {
          //执行INSERT插入操作
          console.log(vals);
          connection.query(
            `INSERT INTO ${tablename} SET ?`,
            vals,
            (e, rows, fields) => {
              if (e) {
                return connection.rollback(() => {
                  console.log("插入失败数据回滚");
                });
              } else {
                connection.commit(error => {
                  if (error) {
                    console.log("事务提交失败");
                  }
                });
                connection.release(); // 释放链接
                resolve({ rows, success: true });
              }
            }
          );
        }
      });
    });
  }).catch(error => console.log(error));
module.exports = {
  selnewsHandler,
  selAllnewsHandler,
  selRangenewsHandler,
  shownewsHandler,
  showCommentsHandler,
  InsertCommentsHandler
};
