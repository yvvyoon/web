var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {
        loginState: req.session.loginState,
        loggedInId: req.session.userId,
        loggedInUserGroupNum: req.session.userGroupNum,
        loggedInUserGroup: req.session.userGroup,
    });
});

module.exports = router;