var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let loginResult = {
        msg: "",
    };

    if(req.session.signupId === req.body.loginId) {
        req.session.loginState = true;
        res.redirect('/');
    } else {
        loginResult.msg = "다시 로그인하세요.";
    }

    res.json(JSON.stringify(loginResult));
});

module.exports = router;
