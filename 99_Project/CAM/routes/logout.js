var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.loginId) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    }
});

module.exports = router;
