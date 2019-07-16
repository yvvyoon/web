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
        // connectionLimit: 10,
    });

    conn.connect((err) => {
        if (err) {
            console.error(err.message);
        }

        console.log("이벤트 등록 DB 접속 성공");

        // 이벤트 등록 쿼리
        const sql1 = `INSERT INTO EVENT(EVENT_NM, EVENT_OPNR_NUM1, EVENT_OPNR_NUM2, EVENT_STRT_DTTM, EVENT_END_DTTM, EVENT_OCCR_PLC_NM, EVENT_OCCR_AREA_NM, TICKET_ISSUE_QTY, SALE_ORG_PRC, LIMIT_RT, EVENT_IMG, EVENT_DESC)
VALUES("${req.body.eventName}", "${req.session.userGroup}", "${req.session.userGroup}", "${req.body.eventStart}", "${req.body.eventEnd}", "${req.body.eventPlace}", "${req.body.eventArea}", ${req.body.ticketIssueQty}, ${req.body.saleOrgPrc}, ${req.body.priceLimit}, "${req.body.fileInput}", "${req.body.eventDesc}")`;

        console.log(sql1);

        conn.query(sql1, (err, results, fields) => {

            if (err) {
                console.error(err.message);
            } else {
                console.log("이벤트 등록 성공");
                console.log("티켓 발행 수량 : ", req.body.ticketIssueQty);

                const sql3 = "SELECT LAST_INSERT_ID() AS LAST_INSERT_ID FROM EVENT";
                console.log(sql3);

                conn.query(sql3, (err, results, fields) => {
                    let eventNum = 0;
                    let issueQty = 0;

                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("최근 ID = ", results[0].LAST_INSERT_ID);

                        // 가장 최근 등록된 이벤트 번호
                        eventNum = results[0].LAST_INSERT_ID;

                        // 티켓 발행 쿼리
                        const sql2 = `INSERT INTO TICKET(EVENT_NUM, OPNR_NUM, SALE_ORG_PRC, FRST_SALER_NUM, LAST_BUYER_NUM, SEAT_NUM, BUY_AVAIL_YN, TICKET_VALID_YN)
VALUES(${eventNum}, 3, "${req.body.saleOrgPrc}", NULL, NULL, NULL, "Y", "Y")`;

                        console.log(sql2);

                        while (issueQty < req.body.ticketIssueQty) {
                            conn.query(sql2, (err, results, fields) => {
                                if (err) {
                                    console.error(err.message);
                                }
                            });

                            issueQty++;
                        }

                        console.log("티켓 발행 성공");

                        eventRegistResult.msg = "티켓 발행 성공";

                        res.json(JSON.stringify(eventRegistResult));
                    }
                });

                eventRegistResult.msg = `${req.body.eventName} 이벤트가 등록되었습니다.`;
            }
        });
    });
});

module.exports = router;