const pool = require("../db_mysqlconfig");

const deletecarouselSql = async (vals) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      err && console.log("连接失败");

      connection.beginTransaction(err => {
        if (err) reject("开启事务失败");

        connection.query(`delete from carousel where (img_id) in (?)`, [vals], (e, rows) => {
          if (e) return connection.rollback(() => {
            console.log('删除失败数据回滚');
            resolve({ result: 0 });
          });
          connection.commit(error => {
            if (error) console.log('事务提交失败');
            connection.release();
            resolve({ result: 1 });
          });
        });
      });
    });
  }).catch(error => console.log(error));

// 添加图片
const addcarouselSql = async (vals) => new Promise((resolve, reject) => {
  // 上传空数据
  if (!vals.length) return resolve({ result: 1 });
  pool.getConnection((err, connection) => {
    err && console.log("连接失败");

    connection.beginTransaction(err => {
      if (err) reject('开启事务失败');

      connection.query(`insert into carousel(path, name, size, type) values ?`, [vals], (e, rows) => {
        if (e) return connection.rollback(() => {
          console.log('添加失败数据回滚');
          resolve({ result: 0 });
        });
        connection.commit(error => {
          if (error) console.log('事务提交失败');
          connection.release();
          resolve({ result: 1 });
        });
      });
    });
  });
}).catch(error => console.log(error));

// 查询所有图片
const selcarouselSql = async () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    err && console.log('连接失败');

    connection.query(`select * from carousel`, (e, data) => {
      e && console.log('查询失败');
      connection.release();
      resolve({ result: 1, data });
    })
  })
}).catch(error => console.log(error));

// 查询指定多张图片路径
const selcarouselbyidSql = async (vals) => new Promise((resolve, reject) => {
  if (!vals.length) return;     // 空数组则返回
  let newvals = [];
  vals.forEach(v => {
    newvals.push(v[0]);
  });
  pool.getConnection((err, connection) => {
    err && console.log('连接失败');

    connection.query(`select path from carousel where img_id in (?)`, [newvals], (e, data) => {
      e && console.log('查询失败');
      connection.release();
      resolve({ result: 1, data });
    })
  })
}).catch(error => console.log(error));

module.exports = {
  deletecarouselSql,
  addcarouselSql,
  selcarouselSql,
  selcarouselbyidSql,
};
