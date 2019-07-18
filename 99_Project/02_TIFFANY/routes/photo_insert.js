var express = require('express');
var router = express.Router();
const mysql = require('mysql'); //1. 드라이버 등록

/* GET users listing. */
router.post('/', function(req, res, next) {

    let conn = mysql.createConnection({     //2.연결
        host : 'localhost',
        user : 'root',
        password : 'mysql',
        database : 'tiffany'
        // dateStrings: 'date'
    });

    conn.connect((err)=>{
        if(err){
            return console.error(err.message);
        }
        console.log("Connected to the MySQL Server : ",req.session.userId);
        const filepath = "public/upload/" + req.session.userId + "_" +req.body.new_filepath;
        const sql = `update member set PHOTO_PATH = '${filepath}' where ID = '${req.session.userId}'`;
        const pic_path = "upload/"+ req.session.userId + "_" +req.body.new_filepath;
        //req.session.photo_path = filepath;
        console.log(sql);
        console.log(filepath);
        conn.query(sql,(err,rs,fields)=>{
            if(err){
                console.log(err.message);

            }else{
                const msg = {msg:"Completed"};
                res.json(JSON.stringify(msg));

            }
            conn.end((err)=>{
                if(err){
                    return console.error(err.message);
                }
                console.log("conn close");
            });
        });
    });

});

module.exports = router;