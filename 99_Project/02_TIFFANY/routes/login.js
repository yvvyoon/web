var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.post('/', function (req, res, next) {
    let loginResult = {
        flag: true,
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

        console.log("로그인 DB 접속 성공");

        const sql1 = "SELECT USER_ID FROM USER";
        const sql2 = `SELECT A.USER_ID, A.USER_PW, A.USER_GRP_NUM, A.USER_NUM, B.USER_GRP_NM FROM USER A, USER_GRP B WHERE 1=1 AND A.USER_GRP_NUM = B.USER_GRP_NUM AND A.USER_ID = "${req.body.loginId}" AND USER_PW = "${req.body.loginPw}"`;

        console.log(sql1);
        console.log(sql2);

        conn.query(sql1, (err, results, fields) => {
            if (err) {
                console.error(err.message);
            } else {
                // 쿼리 수행 결과 데이터 건수
                const resultCnt = results.length;
                // 로그인 화면에서 입력한 ID와 DB를 비교하면서 증가시킬 변수
                let idCnt = 0;

                for (let i = 0; i < resultCnt; i++) {
                    if (req.body.loginId === results[i].USER_ID) {
                        idCnt++;
                    }
                }

                console.log("idCnt = ", idCnt);

                if (idCnt === 0) {
                    loginResult.flag = false;
                    loginResult.msg = "ID가 없습니다. 다시 로그인하세요.";

                    res.json(JSON.stringify(loginResult));
                } else {
                    conn.query(sql2, (err, results, fields) => {
                        if (err) {
                            console.error(err.message);

                            conn.end((err) => {
                                if (err) {
                                    console.error(err.message);
                                }
                            });
                        } else {
                            if (results[0].USER_ID) {
                                console.log("로그인 성공");

                                loginResult.flag = true;
                                loginResult.msg = "로그인 성공";

                                req.session.userId = results[0].USER_ID;
                                req.session.userGroupNum = results[0].USER_GRP_NUM;
                                req.session.userGroup = results[0].USER_GRP_NM;
                                req.session.userNum = results[0].USER_NUM;
                                req.session.filePath = results[0].EVENT_IMG_PATH;
                                req.session.loginState = true;
                            }

                            res.json(JSON.stringify(loginResult));
                        }

                        conn.end((err) => {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                    });
                }


            }
        });
    });
});

module.exports = router;
