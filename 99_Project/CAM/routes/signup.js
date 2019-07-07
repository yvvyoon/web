var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let signupResult = {
        msg: "",
    };

    req.session.signupId = req.body.signupId;
    req.session.loginState = false;

    console.log(req.sessionId);
    console.log(req.session.signupId);
    console.log(req.body.signupId);
    console.log(req.session.loginState);
    console.log(`${req.body.signupName}님 가입 완료`);

    signupResult.msg = `${req.body.signupName}님 가입 완료`;

    res.json(JSON.stringify(signupResult));
});

module.exports = router;