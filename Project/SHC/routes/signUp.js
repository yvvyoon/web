var express = require('express');
var router = express.Router();

/* POST home page. */
router.post('/', function(req, res, next) {
    const signUpResult = {
        msg: '',
    };

    console.log('회원가입 진입');

    req.session.signUpId = req.body.signUpId;

    console.log(req.session.signUpId);
    console.log(req.body.signUpId);

    req.session.loginState = false;

    signUpResult.msg = `${req.body.signUpName}님, 성공적으로 가입되었습니다.`;

    res.json(JSON.stringify(signUpResult));
});

module.exports = router;
