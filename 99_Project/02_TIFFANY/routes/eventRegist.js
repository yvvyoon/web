var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.get("/", function (req, res, next) {
    res.render("eventRegist", {
        loginState: req.session.loginState,
        loggedInId: req.session.userId,
        loggedInUserGroup: req.session.userGroup,
    });
});

router.post('/', function (req, res, next) {
    const eventRegistResult = {
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

        console.log("이벤트 등록 DB 접속 성공");

        const sql = `INSERT INTO EVENT(EVENT_NM, EVENT_OPNR_NUM1, EVENT_OPNR_NUM2, EVENT_STRT_DTTM, EVENT_END_DTTM, EVENT_OCCR_PLC_NM, EVENT_OCCR_AREA_NM, LIMIT_RT, EVENT_IMG, EVENT_DESC)
VALUES("${req.body.eventName}", "${req.session.userGroup}", "${req.session.userGroup}", "${req.body.eventStart}", "${req.body.eventEnd}", "${req.body.eventPlace}", "${req.body.eventArea}", ${req.body.priceLimit}, "${req.body.fileInput}", "${req.body.eventDesc}")`;

        console.log(sql);

        conn.query(sql, (err, results, fields) => {
           if (err) {
               console.error(err.message);
           } else {
               console.log("이벤트 등록 성공");

               eventRegistResult.msg = `${req.body.eventName} 이벤트가 등록되었습니다.`;

               res.json(JSON.stringify(eventRegistResult));
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