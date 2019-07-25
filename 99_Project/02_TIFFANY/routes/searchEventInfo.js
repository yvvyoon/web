var express = require('express');
var router = express.Router();
const mysql = require('mysql');
let len;
let event;
//const week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
const week = new Array('SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT');
const month = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');

let data = {
    event_num: [],
    event: [],
    event_dttm: [],
    event_dttm_YY: [],
    event_dttm_MM: [],
    event_dttm_DD: [],
    event_dttm_DY: [],
    event_dttm_Hr: [],
    event_dttm_Min: [],
    event_dttm_sec: [],
    event_plc: [],
    event_area: []
};

/* GET home page. */
router.get('/', function (req, res, next) {
    const result = { msg: '회원가입 오류' };
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'tiffany'
    });

    con.connect((err) => {
        if (err) {
            return console.log(err.message);
        }
        console.log("DB연결됨", `${req.query.searchEvent}`);
        const sql = `select * from event where EVENT_NM like '%${req.query.searchEvent}%'`;
        console.log(sql);
        con.query(sql, (err, rs, fields) => {
            len = rs.length;
            for(let i = 0; i < len; i++) {
                console.log(rs[i]);
            }

            if (err && len == 0) {
                console.log(err.message);
                result.msg = `${req.query.searchEvent}와 관련한 event가 없습니다.`;
                res.json(JSON.stringify(result));
            } else {
                for (let i = 0; i < len; i++) {
                    data.event_num[i] = rs[i].EVENT_NUM;
                    data.event[i] = rs[i].EVENT_NM;
                    data.event_area[i] = rs[i].EVENT_OCCR_AREA_NM;
                    data.event_plc[i] = rs[i].EVENT_OCCR_PLC_NM;
                    data.event_dttm[i] = rs[i].EVENT_STRT_DTTM;

                    data.event_dttm_YY[i] = rs[i].EVENT_STRT_DTTM.getFullYear();
                    data.event_dttm_MM[i] = month[rs[i].EVENT_STRT_DTTM.getMonth()];
                    data.event_dttm_DD[i] = rs[i].EVENT_STRT_DTTM.getDate();
                    data.event_dttm_DY[i] = week[rs[i].EVENT_STRT_DTTM.getDay()];
                    //data.event_dttm_Hr[i] = rs[i].EVENT_STRT_DTTM.getHours();
                    //data.event_dttm_Min[i] = rs[i].EVENT_STRT_DTTM.getMinutes();
                    //data.event_dttm_sec[i] = rs[i].EVENT_STRT_DTTM.getSeconds();
                    //console.log(req.session.event,"test=======================");
                }
                //console.log(req.session.event,"test=======================");

                res.render('searchEventInfo', {
                    event_num: data.event_num,
                    event: data.event,
                    event_plc: data.event_plc,
                    event_area: data.event_area,
                    eventName: req.query.searchEvent,
                    event_dttm: data.event_dttm,
                    event_dttm_YY: data.event_dttm_YY,
                    event_dttm_MM: data.event_dttm_MM,
                    event_dttm_DD: data.event_dttm_DD,
                    event_dttm_DY: data.event_dttm_DY,
                    //event_dttm_Hr: data.event_dttm_Hr,
                    //event_dttm_Min: data.event_dttm_Min,
                    //event_dttm_sec: data.event_dttm_sec
                    loginState: req.session.loginState,
                    loggedInId: req.session.userId,
                    loggedInUserGroupNum: req.session.userGroupNum,
                    loggedInUserGroup: req.session.userGroup,
                    newImgPath: req.session.newImgPath,
                    tokenQty: req.session.tokenQty,
                });

            }
            con.end((err) => {
                if (err) {
                    return console.log(err.message);
                }
                console.log("con close");
            });//end

        });//query
    });//connect

    /* 
        console.log("second");
        let eventName=req.query.searchEvent;
        res.send(eventName); */
});

module.exports = router;