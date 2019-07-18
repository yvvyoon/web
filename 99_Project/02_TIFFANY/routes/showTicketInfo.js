var express = require('express');
var router = express.Router();
const mysql = require('mysql');

//const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
const week = new Array('SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT');
const month = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');

let data = {
    event_name: "",
    event_dttm: "",
    event_dttm_YY: "",
    event_dttm_MM: "",
    event_dttm_DD: "",
    event_dttm_DY: "",
    event_dttm_Hr: "",
    event_dttm_Min: "",
    event_dttm_sec: "",
    event_plc: "",
    event_area: "",
    ticket_num: [],
    ticket_org_price: [],
    ticket_cur_price: [],
    ticket_buy_avail_yn: [],
    ticket_valid_yn: [],
    ticket_last_buyr_num: [],
    ticket_seat_num: []
};
router.get('/', function (req, res, next) {
    const result = {msg: '회원가입 오류'};

    console.log(req.query.id);

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

        const sql1 = `select * from event where EVENT_NUM like '${req.query.id}'`;

        console.log(sql1);

        con.query(sql1, (err, rs, fields) => {
            len = rs.length;

            console.log("경기 갯수=", len);

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

                console.log("DB2 연결됨", `${req.query.id}`);

                const sql2 = `select * from ticket where EVENT_NUM like '${req.query.id}' and BUY_AVAIL_YN like 'y'`;

                console.log(sql2);

                con.query(sql2, (err, rs, fields) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        len = rs.length;

                        console.log("티켓수 =", len);

                        let totalPrice = 0;

                        for (i = 0; i < len; i++) {
                            data.ticket_num[i] = rs[i].TICKET_NUM;
                            data.ticket_org_price[i] = rs[i].SALE_ORG_PRC;
                            data.ticket_cur_price[i] = rs[i].SALE_CUR_PRC;
                            data.ticket_buy_avail_yn[i] = rs[i].BUY_AVAIL_YN;
                            data.ticket_valid_yn[i] = rs[i].TICKET_VALID_YN;
                            data.ticket_last_buyr_num[i] = rs[i].LAST_BUYR_NUM;
                            data.ticket_seat_num[i] = rs[i].SEAT_NUM;
                            totalPrice += rs[i].SALE_CUR_PRC;
                        }

                        res.render('showTicketInfo', {
                            event_num: req.query.id,
                            event_name: data.event_name,
                            event_plc: data.event_plc,
                            event_area: data.event_area,
                            event_dttm: data.event_dttm,
                            event_dttm_YY: data.event_dttm_YY,
                            event_dttm_MM: data.event_dttm_MM,
                            event_dttm_DD: data.event_dttm_DD,
                            event_dttm_DY: data.event_dttm_DY,
                            event_dttm_HR: data.event_dttm_Hr,
                            event_dttm_MIN: data.event_dttm_Min,
                            avgPrice: totalPrice / len,

                            ticket_num: data.ticket_num,
                            ticket_org_price: data.ticket_org_price,
                            ticket_cur_price: data.ticket_cur_price,
                            ticket_buy_avail_yn: data.ticket_buy_avail_yn,
                            ticket_valid_yn: data.ticket_valid_yn,
                            ticket_last_buyr_num: data.ticket_last_buyr_num,
                            ticket_seat_num: data.ticket_seat_num,
                            ticket_len: len,

                            loginState: req.session.loginState,
                            loggedInId: req.session.userId,
                            loggedInUserGroupNum: req.session.userGroupNum,
                            loggedInUserGroup: req.session.userGroup,
                            newImgPath: req.session.newImgPath,
                            tokenQty: req.session.tokenQty,
                        });
                    }
                });//query2
            }
        });//query1
        // con.end((err) => {
        //     if (err) {
        //         return console.log(err.message);
        //     }
        //     console.log("con close");
        // });//end
    });//connect
});//get

module.exports = router;