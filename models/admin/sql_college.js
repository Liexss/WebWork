const pool = require("../db_mysqlconfig");

// 查询所有学院
const selallcollegeSql = async () =>
new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log("连接失败");

    connection.query(`select * from college`, (e, data) => {
      e && console.log("用户查询失败");
      connection.release();
      resolve({ result: 1, data });
    });
  });
}).catch(error => console.log(error));

module.exports = {
  selallcollegeSql,
};
