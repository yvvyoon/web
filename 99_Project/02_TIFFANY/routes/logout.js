var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.userId) {
        req.session.destroy(function (err) {
            res.redirect("/");
        });

        req.session.loginState = false;
    }
});

module.exports = router;
