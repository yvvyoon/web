var express = require('express');
var router = express.Router();
const mysql = require('mysql');

let saler = {
    saler_num: "",//     사용자번호   USER_NUM
    saler_id: "",//     사용자ID   USER_ID
    saler_token: ""//     보유토큰수량   POSS_TOKEN_QTY
};
let buyer = {
    buyer_num: "",//     사용자번호   USER_NUM
    buyer_id: "",//     사용자ID   USER_ID
    buyer_token: ""//     보유토큰수량   POSS_TOKEN_QTY
};
let ticket = {
    ticket_num: "",    // 티켓번호   TICKET_NUM
    ticket_buyer_num: ""// 최종구매자번호   LAST_BUYR_NUM
};

router.post('/', function (req, res, next) {
    const payResult = {
        msg: "",
    };
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "tiffany",
    });

    con.connect((err) => {
        if (err) {
            console.error(err.message);
        }

        console.log("DB1 티켓조회, 판매자 ID 획득");
        const sql1 = `SELECT * FROM TICKET where TICKET_NUM like ${req.body.ticketNumber}`;
        console.log(sql1);
        con.query(sql1, (err, rs, fields) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log("판매자 =", rs[0].LAST_BUYER_NUM);
                ticket.ticket_buyer_num = rs[0].LAST_BUYER_NUM;
                ticket.ticket_num = req.body.ticketNumber;

                console.log("DB2 구매자 토큰 조회");

                const sql2 = `SELECT * FROM USER where USER_ID ='${req.body.buyerId}'`;
                console.log(sql2);
                con.query(sql2, (err, rs, fields) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        len = rs.length;
                        console.log("id 일치하는 구매자수 =", len);
                        buyer.buyer_id = rs[0].USER_ID;
                        buyer.buyer_num = rs[0].USER_NUM;
                        buyer.buyer_token = rs[0].POSS_TOKEN_QTY;


                        console.log("DB3 구매자 토큰 감소");
                        const ticket_price1 = parseInt(req.body.ticketPrice);
                        let updatedBuyerToken = buyer.buyer_token - ticket_price1;
                        console.log(updatedBuyerToken);
                        const sql3 = "UPDATE user SET POSS_TOKEN_QTY=" + updatedBuyerToken + " where USER_NUM=" + buyer.buyer_num;
                        console.log(sql3);
                        con.query(sql3, (err, rs, fields) => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log("update!");
                                console.log("ticket.ticket_buyer_num : " + ticket.ticket_buyer_num);

                                console.log("DB4 판매자 토큰보유량 조회");
                                const sql4 = "select * from USER where USER_NUM like " + ticket.ticket_buyer_num;
                                console.log(sql4);
                                con.query(sql4, (err, rs, fields) => {
                                    if (err) {
                                        console.log(err.message);
                                    } else {
                                        len = rs.length;
                                        console.log("id 일치하는 판매자수 =", len);

                                        saler.saler_num = rs[0].USER_NUM;//     사용자번호   USER_NUM
                                        saler.saler_id = rs[0].USER_ID;//     사용자ID   USER_ID
                                        saler.saler_token = rs[0].POSS_TOKEN_QTY;//     보유토큰수량   POSS_TOKEN_QTY


                                        console.log("DB5 구매자 토큰 증가");
                                        const saler1 = parseInt(saler.saler_token);
                                        const ticketprice_ = parseInt(req.body.ticketPrice);

                                        const updatedSalerToken = saler1 + ticketprice_;
                                        const sql5 = "UPDATE user SET POSS_TOKEN_QTY=" + updatedSalerToken + " where USER_NUM=" + saler.saler_num;
                                        console.log(sql5);
                                        con.query(sql5, (err, rs, fields) => {
                                            if (err) {
                                                console.log(err.message);
                                            } else {
                                                len = rs.length;
                                                console.log("id 일치하는 구매자수 =", len);

                                                console.log("DB6 거래장부에 거래 내역 추가");
                                                const d = new Date();

                                                console.log("현재시각: ", d);
                                                const sql6 = "INSERT INTO TRANS_HIST(TICKET_NUM, SALER_NUM, BUYR_NUM, TRANS_PRC, TRANS_DTTM) VALUES(" + ticket.ticket_num + ", " + saler.saler_num + ', ' + buyer.buyer_num + ', ' + req.body.ticketPrice + ', SYSDATE())';
                                                console.log(sql6);
                                                con.query(sql6, (err, rs, fields) => {
                                                    if (err) {
                                                        console.log(err.message);
                                                    } else {

                                                        payResult.msg = `성공적으로 결제되었습니다.`;
                                                        res.json(JSON.stringify(payResult));
                                                        con.end((err) => {
                                                            if (err) {
                                                                console.error(err.message);
                                                            }
                                                        });//end
                                                    }//sql6_if
                                                });//query6
                                            }//sql5_if
                                        });//query5
                                    }//sql4_if
                                });//query4
                            }//sql3_if
                        });//query3
                    }//sql2_if
                });//query2
            }//sql1_if
        });//query1
    });
});

module.exports = router;