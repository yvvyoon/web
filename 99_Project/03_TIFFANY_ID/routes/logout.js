var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const result = {msg: ""};

    console.log("Session ID login.js => "+req.sessionID);

    if(req.session){
        req.session.destroy(function(err){
            res.redirect('/');
        });
    }
});

module.exports = router;