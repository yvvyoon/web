var express = require('express');
var router = express.Router();
const Member = require('../models').Member;
const crypto = require('crypto');

router.get('/', function (req, res, next) {
    console.log(req.query);

    req.session.prevPage = req.query.nm;
    res.redirect('/#recert')
});

router.post('/', function (req, res, next) {
    const recertResult = {
        prevPage: req.session.prevPage,
        msg: '',
    };

    // secret값을 rslt에서 name을 가져옴
    const secret = req.session.name;
    // login페이지에서 입력한 pwd를 해싱
    const password = crypto.createHmac('sha256', secret)
        .update(req.body.recertPw)
        .digest('hex');

    console.log(req.body);
    console.log(req.session);

    Member.findOne({
        where: {
            user_id: req.session.login_id,
            password,
        },
    })
        .then((member) => {
            if (member) {
                res.json(JSON.stringify(recertResult));
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

module.exports = router;