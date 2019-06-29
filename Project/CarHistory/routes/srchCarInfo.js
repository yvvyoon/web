var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const srchType = req.body.srchType;
  const carNo = req.body.carNo;
  const result = {msg: ""};
  const carInfo = {
    modelName : ['모델명', '2019 Audi R8'],
    manufacturerName : ['제조사명', 'Audi'],
    exhaustVolume : ['배기량', '5,204cc'],
    fuelType : ['사용연료', 'Gasoline'],
    frame : ['차체형상', '세단'],
    kindOfCar : ['차종', '자가용'],
    firstInsuranceJoinDate : ['최초보험가입일자', '20190627'],
  };

  result.msg = carInfo;
  console.log(result.msg);

  if(srchType && carNo) {
    result.msg = carInfo;
  }
  else {
    result.msg = '잘못 입력했엉';
  }

  res.json(JSON.stringify(result));
});

module.exports = router;
