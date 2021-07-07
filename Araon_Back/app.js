var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser")
var parser = bodyParser.urlencoded({ extended: false });
var fileupload = require("express-fileupload");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var db = require('./db');
const Query = require('pg').Query

const port = process.env.PORT || 3000
var app = express();
app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/upload', parser, function (req, res) {
  // console.log(req.body.base64);
  // res.json({ res: "Hello World" });
  const query = new Query(`INSERT INTO images (image) VALUES('${req.body.image}')`);
  db.query(query)
  // var rows = [];

  // query.on("row", row => { rows.push(row); });

  query.on('end', () => {
    // console.log(rows);
    console.log('query done');
    // res.send(rows);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack);
    res.send({ error: err });
  });
});

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
