const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost", //数据库地址，这里用的是本地
  database: "webwork", //数据库名称
  user: "root", // username
  password: "" // password
});
module.exports = pool;
