var client = require('../models/db_redisconfig.js');

module.exports = function (req, res, next) {
  var t = req.headers.authorization;
  console.log(t)

  client.del(t);
  res.send({ result: 1 });
};
