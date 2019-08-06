var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const result = {msg:""};
    console.log("Session ID login.js => "+req.sessionID);

    if(req.session.login_id){
        req.session.destroy(function(err){
            res.redirect('/');
        });
    }
});

module.exports = router;
