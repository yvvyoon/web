var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

router.post('/', function (req, res, next) {
    const idCheckResult = {
        flag: 3,
        msg: "",
    };

    Member.findAll({
        attributes: ['user_id'],
    })
        .then((rslt) => {
            console.log("ID 중복체크 DB 접속 성공");

            let idCnt = 0;

            for (let i = 0; i < rslt.length; i++) {
                if (req.body.signupId === rslt[i].user_id) {
                    idCnt++;
                    console.log(rslt[i]);
                }
            }

            if (idCnt === 0) {
                idCheckResult.flag = 1;
                idCheckResult.msg = "사용 가능한 ID입니다.";

                res.json(JSON.stringify(idCheckResult));
            } else if (idCnt != 0) {
                idCheckResult.flag = 2;
                idCheckResult.msg = "동일한 ID가 존재합니다.";

                res.json(JSON.stringify(idCheckResult));
            }
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;