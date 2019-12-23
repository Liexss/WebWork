const pool = require("../db_mysqlconfig");

// 学院id查询
const selcollegeidbynameSql = async (vals) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.query(`select college_id from college where college_name=?`, vals, (e, data) => {
        e && console.log("用户查询失败");
        connection.release();
        resolve({ result: 1, data });
      });
    });
  }).catch(error => console.log(error));

module.exports = {
  selcollegeidbynameSql,
};
