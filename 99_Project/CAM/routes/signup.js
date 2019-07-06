var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let signupResult = {
        msg: "",
    };

    req.session.signupId = req.body.signupId;
    req.session.loginState = false;

    console.log(req.session.signupId);
    console.log(req.session.loginState);
    console.log("가입됨");

    signupResult.msg = "가입됨";

    res.json(JSON.stringify(signupResult));
});

module.exports = router;
