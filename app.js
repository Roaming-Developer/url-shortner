var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo");
require("dotenv").config();
var flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var shortRouter = require("./routes/short");

var app = express();

mongoose.connect(
  process.env.MONGODBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("Connected with [mongodb]", err ? false : true);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODBURL }),
  })
);
// "mongodb://localhost/userurls"
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/short", shortRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
