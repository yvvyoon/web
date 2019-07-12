var express = require('express');
var router = express.Router();
// 1. 드라이버 등록
const mysql = require('mysql');
const {Member2} = require('../models');

router.post('/', function (req, res, next) {
    const result = {
        msg: ''
    };

    Member2.findOne({
        where: {
            id: req.body.email
        }
    })
        .then((data) => {
            if(data) {
                console.log(data.name);

                req.session.userId = req.body.email;
                req.session.userName = data.name;
                res.redirect("/");
            } else {
                result.msg = "다시 로그인을 시도하세요.";

                res.json(JSON.stringify(result));
            }
        })
        .catch((err) => {
            console.error(err);

            result.msg = "로그인 실패";

            res.json(JSON.stringify(result));
        })
    //
    // // 2. 데이터베이스 연결
    // const conn = mysql.createConnection({
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
    //     // 3. SQL문 생성
    //     const sql = `select * from member where id = "${req.body.email}"`;
    //     console.log(sql);
    //     console.log(result.msg);
    //
    //     // 4. SQL문 전송
    //     conn.query(sql, (err, results, fields) => {
    //         if (err) {
    //             result.msg = "아이디가 존재하지 않습니다.";
    //
    //             res.json(JSON.stringify(result));
    //
    //             console.log(res.json(JSON.stringify(result)));
    //             console.error(err.message);
    //         } else {
    //             console.log(results[0].name);
    //
    //             if (results[0].name) {
    //                 req.session.userId = req.body.email;
    //                 req.session.userName = results[0].name;
    //                 req.session.loginState = true;
    //                 res.redirect("/");
    //
    //                 console.log("로그인 ID : ", req.session.userId);
    //                 console.log("로그인 상태 : ", req.session.loginState);
    //             } else {
    //                 result.msg = "다시 로그인하세요.";
    //
    //                 res.json(JSON.stringify(result));
    //             }
    //         }
    //
    //         conn.end((err) => {
    //             if (err) {
    //                 return console.error(err.message);
    //             }
    //         });
    //     });
    //
        // console.log(req.session.email);
        // console.log(req.body.email);
        // console.log("로그인 Session ID : ", req.sessionID);
        //
        // if (req.session.email === req.body.email) {  // req.body.email은 my.js로부터 전달받은 sendData.email
        //     req.session.loginState = true;
        //     res.redirect("/");
        //     // result.msg = `${req.session.email}님 로그인되었습니다.`;  // JavaScript 객체 데이터
        // } else {
        //     result.msg = "다시 로그인하세용.";
        //
        //     res.json(JSON.stringify(result));
        //     // res.redirect("/");
        // }
    // });
});

module.exports = router;