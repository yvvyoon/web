var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {
  const result = {msg: ''};

  console.log(req.session.email);
  console.log(req.body.email);

  console.log("로그인 Session ID : ", req.sessionID);

  if(req.session.email === req.body.email) {  // req.body.email은 my.js로부터 전달받은 sendData.email
    req.session.loginState = true;
    res.redirect("/");
    // result.msg = `${req.session.email}님 로그인되었습니다.`;  // JavaScript 객체 데이터
  }
  else {
    result.msg = "다시 로그인하세용.";

    res.json(JSON.stringify(result));
    // res.redirect("/");
  }


});

module.exports = router;
