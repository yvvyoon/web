var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        loginState: req.session.loginState,
        id: req.session.login_id,
        name: req.session.name,
        password: req.session.password,
        id_num: req.session.id_num,
        id_num1: req.session.id_num1,
        phone: req.session.phone,
        address: req.session.address,
        email: req.session.email,
        photo_path: req.session.photo_path,
        newpath: req.session.newpath,
    });
});

module.exports = router;