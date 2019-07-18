var express = require('express');
var router = express.Router();
const formidable = require("formidable");
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
});
const fs = require("fs");

fs.readdir("public/upload", (error) => {
    if (error) {
        console.error("upload 디렉토리가 없어 생성합니다.");

        fs.mkdirSync("public/upload");
    }
});

router.post("/", (req, res) => {
    console.log("*********************************");
    console.log("*********/imgUpload 진입*********");
    console.log("*********************************");

    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        const oldImgPath = files.imgName.path;
        const newImgPath = 'public/upload/' + req.session.userId + '_' + files.imgName.name;

        req.session.newImgPath = newImgPath;

        console.log("newImgPath : " + newImgPath);
        console.log("req.session.newImgPath : " + req.session.newImgPath);
        console.log("req.session.userId : " + req.session.userId);

        fs.rename(oldImgPath, newImgPath, function (err) {
            if (err) {
                throw err;
            }

            // res.redirect("/eventRegist");
            // res.end();
        });
    });
});

module.exports = router;