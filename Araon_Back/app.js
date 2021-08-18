var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var fileupload = require("express-fileupload");

var db = require('./config/db');
const port = process.env.PORT || 3001
var app = express();

db.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connection success!')
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json({ limit: 5000000 }));
app.use(express.urlencoded({ extended: false, limit: 5000000, parameterLimit: 5000000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileupload());
app.use((req, res, next) => {
  console.log("new request", req.method, req.path, new Date().toLocaleDateString());
  next();
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  console.log(`App is running on port ${port}`);
});

module.exports = app;
