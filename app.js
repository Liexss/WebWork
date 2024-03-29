var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var cors = require("cors");

var indexRouter = require("./routes/index");
var HomeRouter = require("./routes/home");
var NewsRouter = require("./routes/news");
var NewsLearnListRouter = require("./routes/newsLearnList");
var NewsNoticeListRouter = require("./routes/newsNoticeList");
var NewsCollegeListRouter = require("./routes/newsCollegeList");
var NewsMediaListRouter = require("./routes/newsMediaList");
var NewsPartyListRouter = require("./routes/newsPartyList");
var NewsTeacheListRouter = require("./routes/newsTeacheList");
var NewsContentRouter = require("./routes/newsContent");
var signupRouter = require("./routes/signup");
var signinRouter = require("./routes/signin");
var PersonalRouter=require("./routes/personal");
var PersonalpasRouter=require('./routes/personalpas');
// var redis=require('./models/db_redisconfig.js');
var adminLoginRouter = require("./routes/admin/login");
var adminCarouselRouter = require("./routes/admin/carousel");
var adminArticleRouter = require("./routes/admin/news");
var adminUserRouter = require("./routes/admin/user");
var adminCommentRouter = require("./routes/admin/comment");

var app = express();

var help = {
  if_eq: function(v1, v2, opts) {
    if (v1 == v2) return opts.fn(this);
    else return opts.inverse(this);
  }
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine(
  ".hbs",
  hbs({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    helpers: help
  })
);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/home", HomeRouter);
app.use("/news", NewsRouter);
app.use("/newsLearnList", NewsLearnListRouter);
app.use("/newsNoticeList", NewsNoticeListRouter);
app.use("/newsCollegeList", NewsCollegeListRouter);
app.use("/newsMediaList", NewsMediaListRouter);
app.use("/newsPartyList", NewsPartyListRouter);
app.use("/newsTeacheList", NewsTeacheListRouter);
app.use("/newsContent", NewsContentRouter);
app.use("/personal", PersonalRouter);
app.use("/personalpas", PersonalpasRouter);
app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/admin/news", adminArticleRouter);
app.use("/admin/login", adminLoginRouter);
app.use("/admin/carousel", adminCarouselRouter);
app.use("/admin/user", adminUserRouter);
app.use("/admin/comment", adminCommentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
