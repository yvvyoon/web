var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.post('/', function(req, res, next) {
    const signupResult = {
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

        console.log("회원가입 DB 접속 성공");

        const sql = `INSERT INTO USER(USER_ID, USER_PW, USER_GRP_NUM) VALUES("${req.body.signupId}", "${req.body.signupPw}",
     ${req.body.userGroup})`;

        console.log(sql);

        conn.query(sql, (err, results, fields) => {
            if(err) {
                console.error(err.message);
            } else {
                console.log("가입 성공");
                signupResult.msg = `${req.body.signupId}님 성공적으로 가입되셨습니다.`;

                res.json(JSON.stringify(signupResult));
            }
        });

        conn.end((err) => {
            if(err) {
                console.error(err.message);
            }
        });
    });
});

module.exports = router;