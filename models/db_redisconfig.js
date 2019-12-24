var redis = require("redis"),
  RDS_PORT = 6379,
  RDS_HOST = "127.0.0.1",
  RDS_OPTS = {},
  client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on("ready", function (res) {
  console.log("ready");
});

client.on("end", function (err) {
  console.log("end");
});

client.on("error", function (err) {
  console.log(err);
});

client.on("connect", function () {
  console.log("redis connect success!");
});
module.exports = client;
