var express = require('express');
var router = express.Router();
// 1. 드라이버 등록
const mysql = require('mysql');
const {Member2} = require('../models');

router.post('/', function (req, res, next) {
    const result = {
        msg: "",
    };

    Member2.findOne({where: {id: req.body.loginEmail}})
        .then((data) => {
            if(data) {
                console.log(data.name);

                req.session.userId = req.body.loginEmail;
                req.session.userName = data.name;
                res.redirect("/");
            } else {
                result.msg = "다시 로그인하세요.";

                res.json(JSON.stringify(result));
            }
        })
        .catch((err) => {
            console.error(err);

            result.msg = "로그인 실패";

            res.json(JSON.stringify(result));
        });
});

module.exports = router;