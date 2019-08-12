var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const formidable = require('formidable');
var fs = require('fs');
const sequelize = require('./models').sequelize;
require('dotenv').config();

var app = express();
sequelize.sync();

// 세션 만료 시간을 10분으로 설정
const expireDate = new Date(Date.now() + 1 * 60 * 1000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.use(require('express-session')({
    resave:false,
    saveUninitialized:true,
    secret: 'secret code',
    cookie:{
      httpOnly:true,
      secure:false,
      expires: expireDate,  // 세션 만료 시간 설정
    }
}));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/member_insert', require('./routes/member_insert'));
app.use('/idCheck', require('./routes/idCheck'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/photo_insert', require('./routes/photo_insert'));
app.use('/modify', require('./routes/modify'));
app.use('/member_delete', require('./routes/member_delete'));
app.use('/recert', require('./routes/recert'));

app.post('/upload', function (req, res) {    
  console.log("==========");
  console.log(req.session.photo_path);
  
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.id_photo_name.path;
    var newpath = 'public/upload/' + req.session.login_id + '_' +files.id_photo_name.name;
    req.session.newpath=newpath;
    req.session.loginState=false;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.redirect("/");
      res.end();
    });
  });
});

app.post('/captcha', function(req, res) {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = "6LeqiLAUAAAAAPUv5pfPzo8Dwy9YufuUZQQ5Ggdx";

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    res.json({"responseSuccess" : "Sucess"});
  });
});

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
