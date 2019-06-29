var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('@#$%rosarosa'));
app.use(session({
  resave: true,  // 세션의 수정사항이 발생하지 않아도 세션을 다시 저장할 것인가
  saveUninitialized: false, // 세션의 저장내용이 없더라도 세션을 부여할 것인가
  secret: '!@#$%rosarosa',
  // 세션ID를 암호화하기 위한 암호키
  // cookie-parser의 argument와 동일해야 함
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/signUp', require('./routes/signUp'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
