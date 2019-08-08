var express = require('express');
var router = express.Router();
const Member = require('../models').Member;
const crypto = require('crypto');

router.post('/', function (req, res, next) {
    const loginResult = {
        // 1 : 로그인 성공
        // 2 : ID 불일치
        // 3 : 패스워드 불일치
        // 4 : 로그인 차단
        flag: 0,
        msg: "",
        tryMsg: "",
    };

    Member.findOne({
        attributes: [
            'id',
            'user_id',
            'name',
            'password',
            'identity_num',
            'phone',
            'address',
            'email',
            'photo_path',
            'loginTryCount',
            'loginLockYn',
            'createdAt',
            'updatedAt'],
        where: {
            user_id: req.body.login_id,
        },
    })
        .then((rslt) => {
            const secret = rslt.name;				//secret값을 rslt에서 name을 가져옴
            const hash = crypto.createHmac('sha256', secret)		//login페이지에서 입력한 pwd를 해싱
                .update(req.body.login_pwd)
                .digest('hex');

            // ID 불일치
            if (rslt === null || rslt === undefined) {
                loginResult.flag = 2;
                loginResult.msg = "ID가 존재하지 않습니다.";

                res.json(JSON.stringify(loginResult));

                return;
            } else if (rslt !== null && rslt !== undefined) {
                // ID 일치
                if (rslt.loginLockYn === 'Y') {
                    loginResult.flag = 4;
                    loginResult.msg = "5회 이상 로그인 실패하여 로그인이 차단되었습니다.\n\n관리자에게 문의하세요.";

                    res.json(JSON.stringify(loginResult));

                    return;
                } else {
                    let loginTryCount = rslt.loginTryCount;

                    if (loginTryCount >= 5) {
                        Member.update({
                            loginLockYn: 'Y',
                        }, {
                            where: {
                                user_id: req.body.login_id,
                            }
                        })
                            .then((rslt) => {
                                loginResult.flag = 4;
                                loginResult.msg = "5회 이상 로그인 실패하여 로그인이 차단됩니다.";
                            })
                            .catch((err) => {
                                console.error(err);
                                next(err);
                            });
                    } else {
                        // 패스워드 불일치
                        if (rslt.password !== hash) {
                            loginResult.flag = 3;
                            loginResult.msg = "패스워드가 일치하지 않습니다.";

                            loginTryCount++;

                            loginResult.tryMsg = "로그인 " + loginTryCount + "회 실패.\n\n5회 실패 시 로그인이 차단됩니다.";

                            Member.update({
                                loginTryCount: loginTryCount,
                            }, {
                                where: {
                                    user_id: req.body.login_id,
                                }
                            })
                                .then((rslt) => {
                                    console.log(rslt);

                                    res.json(JSON.stringify(loginResult));
                                })
                                .catch((err) => {
                                    console.error(err);
                                    next(err);
                                });
                        } else {
                            loginResult.flag = 1;

                            console.log("로그인 성공");

                            req.session.login_id = rslt.user_id;
                            req.session.name = rslt.name;

                            const s_num = rslt.identity_num.split("");
                            let id_num = "";

                            for (let i = 0; i < 6; i++) {
                                id_num += s_num[i];
                            }

                            let id_num_2nd = "";						//주민번호 뒷자리 1개를 추출
                            for(let i=6;i<7;i++){
                                id_num_2nd+=s_num[i];
                            }

                            let id_num1 = rslt.identity_num;
                            let yy = id_num1.substr(0, 2);
                            let mm = id_num1.substr(2, 2);
                            let dd = id_num1.substr(4, 2);
                            let date = yy + "." + mm + "." + dd;

                            //main페이지에서 주민번호가 나오는 양식
                            req.session.id_num = id_num +"-"+id_num_2nd +"******";
                            req.session.id_num1 = date;
                            req.session.password = rslt.password;
                            req.session.phone = rslt.phone;
                            req.session.address = rslt.address;
                            req.session.email = rslt.email;
                            req.session.photo_path = rslt.photo_path;
                            req.session.loginState = true;

                            loginResult.msg = req.session.name + "님, 반갑습니다.";

                            Member.update({
                                loginTryCount: 0,
                            }, {
                                where: {
                                    user_id: req.body.login_id,
                                }
                            })
                                .then((rslt) => {
                                    console.log(rslt);
                                })
                                .catch((err) => {
                                    console.error(err);
                                });

                            res.json(JSON.stringify(loginResult));
                        }
                    }
                }
            }
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;