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

            result.msg = "가입 실패";

            res.json(JSON.stringify(result));
        });
    //
    // console.log("회원가입 Session ID : ", req.sessionID);
    //
    // req.session.email = req.body.email; // req.body.email은 my.js로부터 전달받은 sendData.email
    // req.session.loginState = false;

    // let conn = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "mysql",
    //     database: "nodejs",
    // });
    //
    // conn.connect((err) => {
    //     if (err) {
    //         return console.error(err.message);
    //     }
    //
    //     console.log("DB 연결 성공");
    //
    //     const sql = `insert into member(name, id, comments) values('${req.body.name}', '${req.body.email}', '${req.body.comments}')`;
    //     console.log(sql);
    //
    //     conn.query(sql, (err, results, fields) => {
    //         if (err) {
    //             console.error(err.message);
    //
    //             res.json(JSON.stringify(result));
    //         } else {
    //             console.log(results, fields);
    //
    //             result.msg = `${req.body.email}님 가입되셨습니다.`;  // JavaScript 객체 데이터
    //
    //             res.json(JSON.stringify(result));
    //         }
    //
    //         conn.end((err) => {
    //             if (err) {
    //                 return console.error(err.message);
    //             }
    //         });
    //     });
});

module.exports = router;