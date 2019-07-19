var express = require('express');
var router = express.Router();
const mysql = require('mysql');

//const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
const week = new Array('SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT');
const month = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
let data = {
    ticket_num: [],
    ticket_org_price: [],
    ticket_cur_price: [],
    ticket_fee: [],
    ticket_final_price: [],
    ticket_last_buyr_num: [],
    ticket_seat_num: [],
    ticket_event_num: [],
    ticket_buy_avail_yn: [],
    ticket_valid_yn: [],
    event_nm: [],
    event_strt_dttm: [],
    event_end_dttm: [],
    event_occr_plc_nm: [],
    event_occr_area_nm: [],
    user_id: [],
    user_token: "",
};

router.get("/", function (req, res, next) {
    res.render('sell', {
        ticket_num: data.ticket_num,
        ticket_org_price: data.ticket_org_price,
        ticket_cur_price: data.ticket_cur_price,
        ticket_final_price: data.ticket_final_price,
        ticket_fee: data.ticket_fee,
        ticket_last_buyr_num: data.ticket_last_buyr_num,
        ticket_seat_num: data.ticket_seat_num,
        ticket_buy_avail_yn: data.ticket_buy_avail_yn,
        ticket_valid_yn: data.ticket_valid_yn,
        ticket_event_num: data.ticket_event_num,
        // event_occr_plc_nm: data.event_occr_plc_nm,

        // event_occr_area_nm: data.event_occr_area_nm,
        user_id: data.user_id,
        event_nm: data.event_nm,


        loginState: req.session.loginState,
        loggedInId: req.session.userId,
        loggedInUserGroupNum: req.session.userGroupNum,
        loggedInUserGroup: req.session.userGroup,
        tokenQty: req.session.tokenQty,
    });

    console.log(req.query.id);  //ticket_number
    console.log(req.session.userId);

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'tiffany',
    });

    con.connect((err) => {
        if (err) {
            return console.log(err.message);
        }

        // console.log("DB1 연결됨", `${req.query.id}`);

        const sql1 = `SELECT A.SALE_CUR_PRC, A.SALE_ORG_PRC, A.TICKET_NUM, C.EVENT_NM, C.EVENT_STRT_DTTM, C.EVENT_END_DTTM, C.EVENT_OCCR_PLC_NM, C.EVENT_OCCR_AREA_NM, A.SEAT_NUM, B.USER_ID, A.TICKET_VALID_YN FROM TICKET A, USER B, EVENT C WHERE 1=1 AND A.LAST_BUYER_NUM = '${req.session.userNum}' 
AND A.BUY_AVAIL_YN = "N"  AND A.TICKET_VALID_YN = "Y" AND A.LAST_BUYER_NUM = B.USER_NUM AND A.EVENT_NUM = C.EVENT_NUM`;

        console.log("sql1 : " + sql1);

        con.query(sql1, (err, rs, fields) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(rs[0]);

                for (let i = 0; i < rs.length; i++) {
                    data.ticket_num[i] = rs[i].TICKET_NUM;
                    data.event_nm[i] = rs[i].EVENT_NM;
                    data.user_id[i] = rs[i].USER_ID;
                    data.event_strt_dttm[i] = rs[i].EVENT_STRT_DTTM;
                    data.event_end_dttm[i] = rs[i].EVENT_END_DTTM;
                    data.event_occr_plc_nm[i] = rs[i].EVENT_OCCR_PLC_NM;
                    data.event_occr_area_nm[i] = rs[i].EVENT_OCCR_AREA_NM;
                    data.ticket_org_price[i] = rs[i].SALE_ORG_PRC;
                    data.ticket_cur_price[i] = rs[i].SALE_CUR_PRC;
                    data.ticket_fee[i] = rs[i].SALE_CUR_PRC * 0.05;
                    data.ticket_final_price[i] = rs[i].SALE_CUR_PRC * 1.05;
                    data.ticket_seat_num[i] = rs[i].SEAT_NUM;
                    data.ticket_valid_yn[i] = rs[i].TICKET_VALID_YN;
                    // data.ticket_last_buyr_num[i] = rs[i].LAST_BUYER_NUM;
                    // data.ticket_event_num[i] = rs[i].EVENT_NUM;
                    // data.ticket_buy_avail_yn[i] = rs[i].BUY_AVAIL_YN;
                }

                // console.log(rs.length);
                // console.log(rs[2].SALE_CUR_PRC * 0.05);
                // console.log(rs[3].SALE_CUR_PRC * 0.05);
            }//query1안에 fi문
        });//query1
    });//connect
});


module.exports = router;