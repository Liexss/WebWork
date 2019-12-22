const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

const auth = require('../../utils/auth');
const { deletecarouselSql, addcarouselSql, selcarouselSql, selcarouselbyidSql } = require('../../models/admin/sql_carousel');

router.get('/', auth, async (req, res) => {
  let r = await selcarouselSql();
  if (r.result === 1) res.send({ result: 1, data: r.data });
  else res.send({ result: 0 });
});

router.post('/', auth, async (req, res) => {
  let imgPath = 'public/images/carousel';

  let form = formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = imgPath;
  form.keepExtensions = true;                      // 保留文件后缀
  form.maxFieldsSize = 5 * 1024 * 1024;            // 限制单个文件大小
  form.maxFields = 20 * 1024 * 1024;               // 限制所有文件大小总和

  let uploadprogress = 0;
  let allFile = [];
  let deleteList = [];
  console.log('start:upload----' + uploadprogress);

  form.parse(req);

  form
    .on('field', function (field, value) {      // 上传的参数数据
      deleteList.push([value]);
      console.log(field + ':' + value);
    })
    .on('file', function (field, file) {        // 上传的文件数据
      allFile.push(file);
      console.log('file: ' + file)
    })
    .on("progress", function (bytesReceived, bytesExpected) {
      uploadprogress = (bytesReceived / bytesExpected) * 100; // 计算上传进度
    })
    .on('end', async function () {                    // 上传完成
      console.log('-> upload done');
      // 删除图片
      if (deleteList.length) {
        // 删除图片数据
        deletecarouselSql(deleteList);
        // 删除图片文件
        let img_path = await selcarouselbyidSql(deleteList);
        let r = delDir(img_path.data, imgPath);
        if (r === 1) return res.send({ result: 1, msg: '更新成功！' })
      }
      // 添加图片
      if (allFile.length) {
        let sqlData = [];
        allFile.forEach((file, index) => {        // 遍历上传文件存入db
          let { name, path, size, type } = file;
          size = `${(size / 1024).toFixed(2)}KB`;
          name = name.split('.')[0];
          let splitpath = path.split('\\');
          splitpath.splice(0, 1, 'static');
          let rpath = splitpath.join('\\');
          sqlData.push([rpath, name, size, type]);
        });
        console.log('sqlData: ' + JSON.stringify(sqlData))
        let r = await addcarouselSql(sqlData);
        if (r.result === 1) return res.send({ result: 1, msg: '更新成功！' });
        else return res.send({ result: 0, msg: '更新失败！' });
      }
      if (!deleteList.length) res.send({ result: 0, msg: '图片未有更新！' });
    })
    .on("error", function (err) {
      console.log(err);
      res.send({ result: 0, msg: '上传失败！' });
    });
});

// 删除原有图片
function delDir(data, curPath) {
  data.forEach(v => {
    console.log(v.path)
    fs.unlinkSync(v.path)
  });
  return 1;
}

module.exports = router;
