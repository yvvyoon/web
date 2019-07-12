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
        database: "tiffany",
    });

    conn.connect((err) => {
        if(err) {
            console.error(err.message);
        }

        console.log("로그인 DB 접속 성공");

        const sql = `SELECT USER_ID, USER_PW FROM USER WHERE 1=1 AND USER_ID = "${req.body.loginId}" AND USER_PW = "${req.body.loginPw}"`;

        console.log(sql);

        conn.query(sql, (err, results, fields) => {
            if(err) {
                console.error(err.message);
            } else {
                if(results[0].USER_ID) {
                    loginResult.msg = "로그인 성공";

                    console.log("results[0] = ", results[0]);

                    req.session.userId = results[0].USER_ID;

                    console.log(req.session.userId);
                    console.log(results[0].USER_ID);


                    req.session.loginState = true;
                    console.log("loginState = ", req.session.loginState);
                    console.log("로그인 된 ID : ", req.session.userId);
                    res.json(JSON.stringify(loginResult));
                    // res.redirect('/');
                } else {
                    loginResult.msg = "ID가 없습니다. 다시 로그인하세요.";

                    console.log("로그인 실패");

                    res.json(JSON.stringify(loginResult));
                }
            }

            conn.end((err) => {
                if(err) {
                    console.error(err.message);
                }
            });
        });
    });
});

module.exports = router;
