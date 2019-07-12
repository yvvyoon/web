var express = require('express');
var router = express.Router();

/* POST home page. */
router.post('/', function(req, res, next) {
    const loginResult = {
        msg: '',
    };

    // console.log('디버그1');
    if(req.session.signUpId === req.body.loginId) {
        req.session.loginState = true;
        res.redirect("/");
        // console.log('디버그2');
    }
    else {
        loginResult.msg = '로그인 실패. 다시 로그인하세요.';

        res.json(JSON.stringify(loginResult));
    }
});

module.exports = router;
