var express = require('express');
var router = express.Router();

/* POST users listing. */
router.get('/', function (req, res, next) {
    if (req.session.userId) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });

        req.session.loginState = false;

        console.log("로그아웃 완료");
    }
});

module.exports = router;