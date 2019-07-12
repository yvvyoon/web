var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const {Member2} = require('../models');

/* POST users listing. */
router.post('/', function (req, res, next) {
    const result = {
        msg: "",
    };

    Member2.create({
        name: req.body.name,
        id: req.body.email,
        comments: req.body.comments,
    })
        .then((rs) => {
            console.log(rs);
            result.msg = `${req.body.name}님 가입되었습니다.`;

            res.json(JSON.stringify(result));
        })
        .catch((err) => {
            console.error(err);

            resut.msg = "가입 실패";

            res.json(JSON.stringify(result));
        });
});

module.exports = router;