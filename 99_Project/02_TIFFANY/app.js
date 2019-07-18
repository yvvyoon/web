var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('yvvyoon'));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'yvvyoon',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24000 * 60 * 60, // 24시간 쿠키 유지
    },
}));

app.use('/', require('./routes/index'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/eventRegist', require('./routes/eventRegist'));
app.use('/imgUpload', require('./routes/imgUpload'));
app.use('/myInfoUpdate', require('./routes/myInfoUpdate'));

// app.post("/imgUpload", upload.single("imgName"), (req, res) => {
//     console.log("app.post 진입");
//     res.send("업로드 된 파일 : " + req.file);
//     console.log("req.file = " + req.file);
// });


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.error(err.stack);

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;