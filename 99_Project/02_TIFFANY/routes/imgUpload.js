const express = require('express');
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");

fs.readdir("public/upload/", (error) => {
    if (error) {
        console.error("upload 디렉토리가 없어 생성합니다.");

        fs.mkdirSync("public/upload/");
    }
});

router.post("/", (req, res) => {
    console.log("*********************************");
    console.log("*********/imgUpload 진입*********");
    console.log("*********************************");

    const form = new formidable.IncomingForm();

    console.log("?");

    form.encoding = 'utf-8';
    form.uploadDir = 'public/upload/';
    form.multiples = true;
    form.keepExtensions = true;

    console.log("??");

    let host = req.protocol + '://' + req.get('host');

    console.log("req.protocol : " + req.protocol);
    console.log("req.get('host') : " + req.get("host"));

    let uploadResultUrl = "";

    console.log("???");

    form.on('file', function (field, file) {
        console.log("????");
        console.log(host);


        fs.rename(file.path, form.uploadDir + '/' + file.name);

        uploadResultUrl = `${host}/upload/${file.name}`;
    });

    // form.parse(req, function (err, field, files) {
    //     console.log("?????");
    //     console.log(files);
    //
    //     return res.json({
    //         uploadResult: uploadResultUrl,
    //     });
    // })
});

module.exports = router;