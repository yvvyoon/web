var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const formidable = require('formidable');

router.get("/", function (req, res, next) {
    res.render("eventRegist", {
        loginState: req.session.loginState,
        loggedInId: req.session.userId,
        loggedInUserGroup: req.session.userGroup,
        loggedInUserGroupNum: req.session.userGroupNum,
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
        const eventRegistSql = `INSERT INTO EVENT(EVENT_NM, EVENT_OPNR_NUM1, EVENT_OPNR_NUM2, EVENT_STRT_DTTM, EVENT_END_DTTM, EVENT_OCCR_PLC_NM, EVENT_OCCR_AREA_NM, TICKET_ISSUE_QTY, SALE_ORG_PRC, LIMIT_RT, EVENT_IMG, EVENT_DESC)
VALUES("${req.body.eventName}", ${req.session.userNum}, ${req.session.userNum}, "${req.body.eventStart}", "${req.body.eventEnd}", "${req.body.eventPlace}", "${req.body.eventArea}", ${req.body.ticketIssueQty}, ${req.body.saleOrgPrc}, ${req.body.priceLimit}, "${req.body.fileInput}", "${req.body.eventDesc}")`;

        conn.query(eventRegistSql, (err, results, fields) => {
            if (err) {
                console.error(err.message);
            } else {
                // 가장 최근에 등록된 이벤트 번호 출력 쿼리
                const recentEventSql = "SELECT LAST_INSERT_ID() AS LAST_INSERT_ID FROM EVENT";

                conn.query(recentEventSql, (err, results, fields) => {
                    // 이벤트 번호
                    let eventNum = 0;
                    // 티켓 발행 수량
                    let issueQty = 0;

                    if (err) {
                        console.error(err.message);
                    } else {
                        // console.log("최근 ID = ", results[0].LAST_INSERT_ID);

                        // 가장 최근에 등록된 이벤트 번호
                        eventNum = results[0].LAST_INSERT_ID;

                        // 티켓 발행 쿼리
                        const ticketIssueSql = `INSERT INTO TICKET(EVENT_NUM, OPNR_NUM, SALE_ORG_PRC, FRST_SALER_NUM, LAST_BUYER_NUM, SEAT_NUM, BUY_AVAIL_YN, TICKET_VALID_YN)
VALUES(${eventNum}, ${req.session.userNum}, "${req.body.saleOrgPrc}", NULL, NULL, NULL, "Y", "Y")`;

                        while (issueQty < req.body.ticketIssueQty) {
                            conn.query(ticketIssueSql, (err, results, fields) => {
                                if (err) {
                                    console.error(err.message);
                                }
                            });

                            issueQty++;
                        }

                        eventRegistResult.msg = "이벤트 등록 및 티켓 발행 성공";
                        res.json(JSON.stringify(eventRegistResult));
                    }
                });
            }
        });
    });
});

module.exports = router;