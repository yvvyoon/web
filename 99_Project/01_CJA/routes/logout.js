var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // if(req.session.userId) {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            }

            res.redirect('/');
        });
    // }
});

module.exports = router;
