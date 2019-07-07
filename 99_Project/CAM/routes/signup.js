var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let signupResult = {
        msg: "",
    };

    req.session.userId = req.body.userId;
    req.session.userPw = req.body.userPw;
    req.session.userName = req.body.userName;
    req.session.userEmail = req.body.userEmail;
    req.session.loginState = false;

    signupResult.msg = `${req.body.userName}님, 성공적으로 가입되셨습니다.`;

    res.json(JSON.stringify(signupResult));
});

module.exports = router;