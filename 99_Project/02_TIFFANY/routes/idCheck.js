var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.post('/', function (req, res, next) {
    const idCheckResult = {
        flag: 3,
        msg: "",
    };

    const conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "tiffany",
    });

    conn.connect((err) => {
        if (err) {
            console.error(err.message);
        }

        console.log("ID 중복체크 DB 접속 성공");

        const sql = "SELECT USER_ID FROM USER";

        console.log(sql);

        conn.query(sql, (err, results, fields) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("ID 중복체크 진입 성공");

                let idCnt = 0;

                for (let i = 0; i < results.length; i++) {
                    if (req.body.signupId === results[i].USER_ID) {
                        idCnt++;
                    }
                }

                if (idCnt === 0) {
                    idCheckResult.flag = 1;
                    idCheckResult.msg = "사용 가능한 ID입니다.";

                    res.json(JSON.stringify(idCheckResult));
                } else if (idCnt !== 0) {
                    idCheckResult.flag = 2;
                    idCheckResult.msg = "동일한 ID가 존재합니다.";

                    res.json(JSON.stringify(idCheckResult));
                }
            }
        });

        conn.end((err) => {
            if (err) {
                console.error(err.message);
            }
        });
    });
});

module.exports = router;