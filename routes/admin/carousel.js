const express = require("express");
const router = express.Router();
const formidable = require("formidable");

const auth = require("../../utils/auth");

router.post("/", auth, async (req, res) => {
  console.log(req.body);

  let form = formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = "public/images/carousel";
  form.keepExtensions = true; // 保留文件后缀
  form.maxFieldsSize = 5 * 1024 * 1024; // 限制单个文件大小
  form.maxFields = 20 * 1024 * 1024; // 限制所有文件大小总和

  let uploadprogress = 0;
  let allFile = [];
  console.log("start:upload----" + uploadprogress);

  form.parse(req);

  form
    .on("file", function(field, file) {
      // 上传的文件数据
      allFile.push(file);
    })
    .on("progress", function(bytesReceived, bytesExpected) {
      uploadprogress = (bytesReceived / bytesExpected) * 100; // 计算上传进度
    })
    .on("end", function() {
      // 上传完成
      console.log("-> upload done\n");
      allFile.forEach((file, index) => {
        // 遍历上传文件存入model
        let { name, path, size, type } = file;
        size = `${(size / 1024).toFixed(2)}KB`;
        // TODO 存入db
      });
    })
    .on("error", function(err) {
      console.log(err);
      res.send({ result: 0, msg: "上传失败" });
    });
});

module.exports = router;
