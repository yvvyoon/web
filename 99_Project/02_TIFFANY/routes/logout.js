var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const logoutResult = {
        msg: "",
    };

    if (req.session.userId) {
        req.session.destroy();

        logoutResult.msg = "ㅎㅇ";

        res.json(JSON.stringify(logoutResult));
    }
});

module.exports = router;
