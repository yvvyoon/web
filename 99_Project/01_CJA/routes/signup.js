var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.post('/', function (req, res, next) {
    let signupResult = {
        msg: "",
    };
    let conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "cja",
    });

    conn.connect((err) => {
        if (err) {
            return console.error(err.message);
        }

        console.log("DB 접속 성공");

        const sql = `insert into member(user_id, user_pw, user_nm, user_email) values("${req.body.userId}", "${req.body.userPw}", "${req.body.userName}", "${req.body.userEmail}")`;
        console.log(sql);

        conn.query(sql, (err, results, fields) => {
           if(err) {
               return console.error(err.message);

               signupResult.msg = "회원가입 오류";
           } else {
               // req.session.userId = req.body.userId;
               // req.session.userPw = req.body.userPw;
               // req.session.userName = req.body.userName;
               // req.session.userEmail = req.body.userEmail;
               // req.session.loginState = false;

               // console.log("loginState : ", req.session.loginState);

               signupResult.msg = `${req.body.userName}님 가입되었습니다.`;

               res.json(JSON.stringify(signupResult));
           }

           conn.end((err) => {
               if(err) {
                   return console.error(err.message);
               }
           });
        });
    });


});

module.exports = router;