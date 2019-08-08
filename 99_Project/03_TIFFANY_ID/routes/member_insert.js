var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

router.post('/', function (req, res, next) {
    const result = {msg: 'Sign up Error'};

    Member.create({
        user_id: req.body.id,
        name: req.body.name,
        password: req.body.password,
        identity_num: req.body.id_num,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        loginTryCount: 0,
        loginLockYn: 'N',
    })
        .then((result) => {
            console.log(result);
            // res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });

    result.msg = req.body.name + "님, 가입되셨습니다.<br><br>창을 닫고 Login하세요.";

    req.session.name = req.body.name;
    res.json(JSON.stringify(result));

    console.log(result.msg);
});

module.exports = router;