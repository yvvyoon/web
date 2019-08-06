var express = require('express');
var router = express.Router();
const Member = require('../models').Member;

router.post('/', function (req, res, next) {
    const result = {msg: "Completed"};
    const filepath = "upload/" + req.session.login_id + "_" + req.body.new_filepath;

    Member.update({
        photo_path: filepath,
    }, {
        where: {
            user_id: req.session.login_id,
        },
    })
        .then((rslt) => {
            console.log(rslt);

            res.json(JSON.stringify(result));
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;