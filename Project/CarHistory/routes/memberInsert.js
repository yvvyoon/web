var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {
  const result = {msg: ''};

  console.log("회원가입 Session ID : ", req.sessionID);

  req.session.email = req.body.email; // req.body.email은 my.js로부터 전달받은 sendData.email
  req.session.loginState = false;

  result.msg = `${req.body.email}님 가입되셨습니다.`;  // JavaScript 객체 데이터

  res.json(JSON.stringify(result));
});

module.exports = router;
