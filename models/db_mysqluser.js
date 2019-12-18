const pool = require('./db_mysqlconfig') //引入上面所讲的数据库基础配置

const insertuserHandler = async (vals) =>new Promise((resolve, reject) =>  {
  pool.getConnection((err, connection) => {
    if(err){
      console.log("连接失败");
    }
    const tablename = 'user' //动态table(表)名称
    //开启事务
    connection.beginTransaction( err => {
      if(err) {
        return '开启事务失败'
      } else {
        //执行INSERT插入操作
        console.log(vals);
        connection.query(`INSERT INTO ${tablename} SET ?`, vals, (e, rows, fields) => {
          if(e) {
            return connection.rollback(() => {
              console.log('插入失败数据回滚');
            })
          } else {
            connection.commit((error) => {
              if(error) {
                console.log('事务提交失败');
              }
            })
            connection.release(); // 释放链接
            //console.log({rows, success: true});
            resolve({rows, success: true});
          }
        })
      }
    })
  })
})

const searchuserHandler = async (vals) =>new Promise((resolve, reject) =>  {
  console.log(vals);
  pool.getConnection((err, connection) => {
    if(err){
      console.log("连接失败");
    }
    const tablename = 'user'; //动态table(表)名称
    //开启事务
        //执行INSERT插入操作
    connection.query(`SELECT * FROM ${tablename} WHERE ?`, vals, (e,result) => {
      if(e) {
        console.log("查询失败");
      } else {
        connection.release();  // 释放链接
        //console.log({result,vals});
        resolve({result});
      }
    })
  })
})

const showcollegeHandler = async (vals) =>new Promise((resolve, reject) =>  {
  pool.getConnection((err, connection) => {
    if(err){
      console.log("连接失败");
    }
    const tablename = 'college'; //动态table(表)名称
    //开启事务
        //执行INSERT插入操作
    connection.query(`SELECT * FROM ${tablename}`, (e,result) => {
      if(e) {
        console.log("查询失败");
      } else {
        connection.release();  // 释放链接
        //console.log({result});
        resolve({result});
      }
    })
  })
})
// 用user_id 查对应 user_name
const selNameById = async (vals) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log('连接失败'); 
    connection.query(`select user_name from user where ?`, vals, (e, result) => {
      e && console.log('查询失败');
      connection.release();
      resolve(result);
    })
  })
});






module.exports = {
  insertuserHandler,
  searchuserHandler,
  showcollegeHandler,
  selNameById
}