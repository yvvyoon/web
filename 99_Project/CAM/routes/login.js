var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let loginResult = {
        msg: "",
    };

    console.log(req.session.signupId);
    console.log(req.body.loginId);

    if(req.session.signupId === req.body.loginId) {
        console.log("로그인 됨");

        req.session.loginState = true;
        res.redirect("/");
    } else {
        console.log("로그인 시발");

        loginResult.msg = "다시 로그인하세요.";

        res.json(JSON.stringify(loginResult));
    }
});

module.exports = router;
