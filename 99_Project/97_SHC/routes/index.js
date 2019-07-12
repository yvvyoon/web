var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.signUpName);
  console.log(req.session.loginId);
  console.log(req.session.loginPw);

  res.render('index', {
    loginState: req.session.loginState,
    loggedInName: req.session.loginName,
  });
});

module.exports = router;
