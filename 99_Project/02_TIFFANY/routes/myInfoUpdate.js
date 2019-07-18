var express = require('express');
var router = express.Router();
const mysql = require('mysql');

router.get('/', function (req, res, next) {
    res.render("myInfoUpdate", {
        loginState: req.session.loginState,
        loggedInId: req.session.userId,
        loggedInUserGroup: req.session.userGroup,
        loggedInUserGroupNum: req.session.userGroupNum,
        tokenQty: req.session.tokenQty,
    });

    console.log("myInfoUpdate");
});

router.post("/", function (req, res, next) {
    const myInfoUpdateResult = {
        msg: "",
    };

    const conn = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "mysql",
       database: "tiffany",
    });

    conn.connect((err => {
        if (err) {
            console.error(err.message);
        }

        const sql = `UPDATE USER SET USER_PW = "${req.body.updatePw}", USER_GRP_NUM = "${req.body.updateUserGroup}" WHERE USER_ID = "${req.session.userId}"`;

        console.log(sql);

        conn.query(sql, (err, results, fields) => {
            if (err) {
                console.error(err);
            } else {
                console.log("이벤트 등록 성공");

                myInfoUpdateResult.msg = `${req.session.userId}님의 정보가 수정되었습니다.`;

                res.json(JSON.stringify(myInfoUpdateResult));
            }

        })
    }));

});

module.exports = router;