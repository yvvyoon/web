var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

router.get('/', function (req, res, next) {
    const result = {msg: 'Modify Error'};

    Member.destroy({
        where: {
            user_id: req.session.login_id,
        },
    })
        .then((rslt) => {
            console.log(rslt);

            if (req.session) {
                req.session.destroy();

                result.msg = "삭제 완료";
                console.log(result.msg);

                res.json(JSON.stringify(result));
            }
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;