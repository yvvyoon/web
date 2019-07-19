var express = require('express');
var router = express.Router();
const mysql = require('mysql');

//const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
const week = new Array('SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT');
const month = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
let data = {
    ticket_num: "",
    ticket_org_price: "",
    ticket_cur_price: "",
    ticket_fee: "",
    ticket_final_price: "",
    ticket_last_buyr_num: "",
    ticket_seat_num: "",
    ticket_event_num: "",

    event_name: "",
    event_dttm: "",
    event_dttm_YY: "",
    event_dttm_MM: "",
    event_dttm_DD: "",
    event_dttm_DY: "",
    event_dttm_Hr: "",
    event_dttm_Min: "",
    event_plc: "",
    event_area: "",

    user_id: "",
    user_token: ""
};

router.get('/', function (req, res, next) {
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

        console.log("DB1 연결됨", `${req.query.id}`);
        const sql1 = `select * from ticket where TICKET_NUM like '${req.query.id}'`;
        console.log(sql1);
        con.query(sql1, (err, rs, fields) => {
            if (err) {
                console.log(err.message);
            } else {
                data.ticket_num = rs[0].TICKET_NUM;
                data.ticket_org_price = rs[0].SALE_ORG_PRC;
                data.ticket_cur_price = rs[0].SALE_CUR_PRC;
                data.ticket_fee = rs[0].SALE_CUR_PRC * 0.05;
                data.ticket_final_price = rs[0].SALE_CUR_PRC * 1.05;
                data.ticket_last_buyr_num = rs[0].LAST_BUYR_NUM;
                data.ticket_seat_num = rs[0].SEAT_NUM;
                data.ticket_event_num = rs[0].EVENT_NUM;

                console.log("DB2 연결됨", `${req.query.id}`);
                const sql2 = `select * from event where EVENT_NUM like '${data.ticket_event_num}'`;
                console.log(sql2);
                con.query(sql2, (err, rs, fields) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        data.event_name = rs[0].EVENT_NM;
                        data.event_area = rs[0].EVENT_OCCR_AREA_NM;
                        data.event_plc = rs[0].EVENT_OCCR_PLC_NM;
                        data.event_dttm = rs[0].EVENT_STRT_DTTM;

                        data.event_dttm_YY = rs[0].EVENT_STRT_DTTM.getFullYear();
                        data.event_dttm_MM = month[rs[0].EVENT_STRT_DTTM.getMonth()];
                        data.event_dttm_DD = rs[0].EVENT_STRT_DTTM.getDate();
                        data.event_dttm_DY = week[rs[0].EVENT_STRT_DTTM.getDay()];
                        data.event_dttm_Hr = rs[0].EVENT_STRT_DTTM.getHours();
                        data.event_dttm_Min = rs[0].EVENT_STRT_DTTM.getMinutes();


                        console.log("DB3 연결됨", `${req.session.userId}`);
                        const sql3 = `select * from user where USER_ID like '${req.session.userId}'`;
                        console.log(sql3);
                        con.query(sql3, (err, rs, fields) => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                data.user_id = rs[0].USER_ID;
                                data.user_token = rs[0].POSS_TOKEN_QTY;

                                res.render('pay', {
                                    loginState: req.session.loginState,
                                    loggedInId: req.session.loggedInId,
                                    loggedInUserGroup: req.session.loggedInUserGroup,
                                    loggedInUserGroupNum: req.session.loggedInUserGroupNum,
                                    tokenQty: req.session.tokenQty,
                                    newImgPath: req.session.newImgPath,

                                    ticket_num: data.ticket_num,
                                    ticket_org_price: data.ticket_org_price,
                                    ticket_cur_price: data.ticket_cur_price,
                                    ticket_last_buyr_num: data.ticket_last_buyr_num,
                                    ticket_seat_num: data.ticket_seat_num,
                                    ticket_event_num: data.ticket_event_num,
                                    ticket_fee: data.ticket_fee,
                                    ticket_final_price: data.ticket_final_price,

                                    event_name: data.event_name,
                                    event_dttm: data.event_dttm,
                                    event_YY: data.event_dttm_YY,
                                    event_MM: data.event_dttm_MM,
                                    event_DD: data.event_dttm_DD,
                                    event_DY: data.event_dttm_DY,
                                    event_Hr: data.event_dttm_Hr,
                                    event_Min: data.event_dttm_Min,
                                    event_plc: data.event_plc,
                                    event_area: data.event_area,

                                    user_id: data.user_id,
                                    user_token: data.user_token,



                                });//render
                            }//query3안에 if문
                        });//query3
                    }//query2안에 if문
                });//query2
            }//query1안에 fi문
        });//query1
    });//connect
});

module.exports = router;