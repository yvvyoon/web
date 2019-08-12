var express = require('express');
var router = express.Router();
const Member = require('../models').Member;
const crypto = require('crypto');

router.post('/', async function (req, res, next) {
    console.log(JSON.stringify(req.body, null, 2));
    console.log(JSON.stringify(req.session, null, 2));

    const result = {
        flag: true,
        msg: 'Modify Error'
    };
    const secret = req.session.name;				//secret값을 rslt에서 name을 가져옴
    const hash = crypto.createHmac('sha256', secret)		// modify 페이지에서 입력한 pwd를 해싱
        .update(req.body.password)
        .digest('hex');

    if (!req.body.password && !req.body.new_password) {
        try {
            let options = {
                    where: {
                        user_id: req.session.login_id,
                    }
                },
                data = {
                    password: req.session.password,
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    address: req.body.address,
                }

            let member = await Member.update(data, options);

            console.log(`member result => ${JSON.stringify(member, null, 2)}`);

            req.session.loginState = false;

            result.flag = true;
            result.msg = "수정 완료";

            console.log(result.msg);

            res.json(JSON.stringify(result));
        } catch (e) {
            console.error(e)
        }
    } else {
        if (req.body.password !== req.body.new_password) {
            result.flag = false;
            result.msg = '패스워드가 일치하지 않습니다. 다시 확인해주세요.';

            res.json(JSON.stringify(result));
        } else if (req.body.password === req.body.new_password) {
            try {
                let options = {
                        where: {
                            user_id: req.session.login_id,
                        }
                    },
                    data = {
                        password: hash,
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: req.body.address,
                    }

                let member = await Member.update(data, options);

                console.log(`member result => ${JSON.stringify(member, null, 2)}`);

                req.session.loginState = false;

                result.flag = true;
                result.msg = "수정 완료";

                console.log(result.msg);

                res.json(JSON.stringify(result));
            } catch (e) {
                console.error(e)
            }
        }
    }
});

module.exports = router;