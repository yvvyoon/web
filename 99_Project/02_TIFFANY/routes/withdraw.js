var express = require('express');
var router = express.Router();
const mysql = require("mysql");

router.get('/', function (req, res, next) {
    const withdrawResult = {
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

        console.log("탈퇴 DB 접속 성공");

        const sql = `DELETE FROM USER WHERE 1=1 AND USER_NUM = ${req.session.userNum}`;

        conn.query(sql, (err, results, fields) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("탈퇴된 회원 : " + req.session.userId);

                withdrawResult.msg = "탈퇴되셨습니다.";

                req.session.destroy();
                res.json(JSON.stringify(withdrawResult));
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
