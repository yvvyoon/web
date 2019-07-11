var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    let srchRslt = {
        msg : "",
    };
    const histData = {
        lotNo : "LOT1408146112000023",
        seqNo : "1",
        histNo : "002 0763 5982 9",
        objKind : "한우",
        grade : "1",
        breedPlace : "전라남도 장흥군 장흥읍 대치길",
    };

    if(req.body.lotNo === histData.lotNo) {
        srchRslt.msg = "조회 성공";

        window.open("html/history.html", "_blank", "width=1280px; height=960px; left=" + popupX + "top=" + popupY);

        res.json(JSON.stringify(srchRslt));
    } else {
        srchRslt.msg = "해당 데이터가 없습니다.";

        console.log("틀려용");

        res.json(JSON.stringify(srchRslt));
    }
});

module.exports = router;
