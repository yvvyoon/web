var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

router.post('/', function (req, res, next) {
    const result = {msg: 'Modify Error'};

    Member.update({
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    }, {
        where: {
            user_id: req.session.login_id,
        }
    })
        .then((rslt) => {
            console.log(rslt);

            req.session.loginState = false;

            result.msg = "수정 완료";
            console.log(result.msg);

            res.json(JSON.stringify(result));
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;