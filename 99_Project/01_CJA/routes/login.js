var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.post('/', function(req, res, next) {
    let loginResult = {
        msg: "",
    };

    const conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "cja",
    });

    conn.connect((err) => {
        if(err) {
            console.error(err.message);
        }

        console.log("DB 접속 성공");

        const sql = `select * from member where user_id = "${req.body.userId}" and user_pw = "${req.body.userPw}"`;
        console.log(sql);

        conn.query(sql, (err, results, fields) => {
            if(err) {
                console.error(err.message);
            } else {
                if(results[0].user_id) {
                    loginResult.msg = "로그인 성공";

                    console.log(results[0]);
                    console.log(results[0].user_nm);

                    req.session.userId = results[0].user_id;
                    req.session.userPw = results[0].user_pw;
                    req.session.userName = results[0].user_nm;
                    req.session.userEmail = results[0].user_email;
                    console.log(req.session.userId);
                    console.log(req.session.userPw);
                    console.log(req.session.userName);
                    console.log(req.session.userEmail);
                    req.session.loginState = true;
                    console.log(req.session.loginState);
                    console.log("ㅅㅂ");
                    res.json(JSON.stringify(loginResult));
                    res.redirect("/");
                } else {
                    loginResult.msg = "로그인 실패";

                    res.json(JSON.stringify(loginResult));
                }
            }

            conn.end((err) => {
                if(err) {
                    return console.error(err.message);
                }
            });
        });
    });

    // console.log(req.session.userId);
    // console.log(req.body.userId);

    // if(req.session.userId === req.body.userId) {
    //     req.session.loginState = true;
    //     res.redirect('/');
    // } else {
    //     loginResult.msg = "다시 로그인하세요.";
    //
    //     res.json(JSON.stringify(loginResult));
    // }
});

module.exports = router;
