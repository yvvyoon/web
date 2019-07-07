var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.signUpName);
  console.log(req.session.loginId);
  console.log(req.session.loginPw);

  res.render('index', {
    title: '축잘알',
    loginState: req.session.loginState,
    // loggedInName: req.session.loginState,
  });
});

module.exports = router;
