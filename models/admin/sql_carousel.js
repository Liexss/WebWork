const pool = require("../db_mysqlconfig");

const deletecarouselSql = async () =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.beginTransaction(err => {
        if (err) reject("开启事务失败");

        connection.query(`delete from carousel`, (e, rows) => {
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

module.exports = {
  deletecarouselSql
};
