var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

router.post('/', function (req, res, next) {
    const loginResult = {
        flag: false,
        msg: ""
    };

    Member.findOne({
        attributes: ['id',
            'user_id',
            'name',
            'password',
            'identity_num',
            'phone',
            'address',
            'email',
            'photo_path',
            'createdAt',
            'updatedAt'],
        where: {
            user_id: req.body.login_id,
        },
    })
        .then((rslt) => {
            // ID 불일치
            if (rslt == null || rslt == undefined) {
                loginResult.flag = false;
                loginResult.msg = "ID가 존재하지 않습니다.";

                res.json(JSON.stringify(loginResult));

                return;
            }

            // 패스워드 불일치
            if (rslt.password != req.body.login_pwd) {
                loginResult.flag = false;
                loginResult.msg = "패스워드가 일치하지 않습니다.";

                res.json(JSON.stringify(loginResult));
            } else {
                console.log("로그인 성공");

                req.session.login_id = rslt.user_id;
                req.session.name = rslt.name;

                const s_num = rslt.identity_num.split("");
                let id_num = "";

                for (let i = 0; i < 8; i++) {
                    id_num += s_num[i];
                }

                let id_num1 = rslt.identity_num;
                let yy = id_num1.substr(0, 2);
                let mm = id_num1.substr(2, 2);
                let dd = id_num1.substr(4, 2);
                let date = yy + "." + mm + "." + dd;

                req.session.id_num = id_num + "******";
                req.session.id_num1 = date;
                req.session.password = rslt.password;
                req.session.phone = rslt.phone;
                req.session.address = rslt.address;
                req.session.email = rslt.email;
                req.session.photo_path = rslt.photo_path;
                req.session.loginState = true;

                loginResult.msg = req.session.name + "님, 반갑습니다.";

                res.json(JSON.stringify(loginResult));
            }
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;
  