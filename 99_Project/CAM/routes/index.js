var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.userId);
  console.log(req.session.userPw);
  console.log(req.session.userName);
  console.log(req.session.userEmail);
  console.log(req.session.loginState);

  res.render('index', {
    loginState : req.session.loginState,
    loggedInName : req.session.userId,
  });
});

module.exports = router;
