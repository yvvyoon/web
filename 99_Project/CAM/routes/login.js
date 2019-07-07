var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let loginResult = {
        msg: "",
    };

    console.log(req.session.userId);
    console.log(req.body.userId);

    if(req.session.userId === req.body.userId) {
        req.session.loginState = true;
        res.redirect('/');
    } else {
        loginResult.msg = "다시 로그인하세요.";

        res.json(JSON.stringify(loginResult));
    }
});

module.exports = router;
