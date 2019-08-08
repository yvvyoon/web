$(document).ready(function () {
    let signupFlag = false;

    $("#signup_btn").click(function () {
        const id = $("#id").val();
        const name = $("#name").val();
        const password = $("#password").val();
        const id_num = $("#id_num_1").val()+$("#id_num_2").val();
        const phone = $("#phone_1").val()+$("#phone_2").val()+$("#phone_3").val();
        const address = $("#address").val();
        const email = $("#email").val();
        const send_params = {
            id,
            name,
            password,
            id_num,
            phone,
            address,
            email
        };

        /* 서브밋 전에 리캡챠 체크 여부 를 확인합니다. */
        if (grecaptcha.getResponse() == "") {
            alert("리캡챠를 체크해야 합니다.");

            signupFlag = false;

            return false;
        } else {
            signupFlag = true;

            if (signupFlag === true) {
                $.post('/member_insert', send_params, function (data, status) {
                    const parsed_data = JSON.parse(data);

                    $("#sign_up_div").html("<h1>" + parsed_data.msg + "</h1>");
                }); //post
            } else {
                alert("가입이 완료되지 않았습니다.")
            }

            return true;
        }
    });//signup_btn

    // ID 중복체크
    $("#idCheck").click(function() {
        const signupId = $("#id").val();
        const idCheckData = {
            signupId,
        };

        if (!signupId) {
            $("#idCheckMsg").html("<p style='float: right; color: red' id='idCheckMsg'>" + "ID를 입력한 후 중복체크를 하세요.</p>");
        } else {
            $.post("/idCheck", idCheckData, function (data, status) {
                console.log("IDCHECK_POST_TEST");
                const parsedData = JSON.parse(data);

                // 사용 가능한 ID일 때
                if (parsedData.flag === 1) {
                    $("#idCheckMsg").html("<p style='float: right; color: white' id='idCheckMsg'>" + parsedData.msg + "</p>");
                    // 동일한 ID가 존재할 때
                } else if (parsedData.flag === 2) {
                    $("#idCheckMsg").html("<p style='float: right; color: red' id='idCheckMsg'>" + parsedData.msg + "</p>");
                }
            });
        }
    });

    $('#password').change(function () {
        const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*=+])(?=.*[0-9]).{8,20}$/;
        const password = document.getElementById("password").value;

        if (!pwdCheck.test(password)) {
            alert("패스워드는 문자, 숫자, 특수문자의 조합으로 입력하세요.");

            signupFlag = false;
        }

        if (password.length < 8 || password.length > 20) {
            alert("패스워드는 8자리 이상, 20자리 이하로 입력하세요.");

            signupFlag = false;
        } else {
            signupFlag = true;
        }
    });

    $('#login_btn').click(function () {
        const login_id = $('#login_id').val();
        const login_pwd = $("#login_pwd").val();
        const send_params = {
            login_id,
            login_pwd
        };

        $.post('/login', send_params, function (data, status) {
            try {
                const parsed_data = JSON.parse(data);

                switch (parsed_data.flag) {
                    // 로그인 성공
                    case 1:
                        alert(parsed_data.msg);
                        window.location.assign("/");
                        break;
                    // ID 불일치
                    case 2:
                        alert(parsed_data.msg);
                        window.location.assign("/#login");
                        break;
                    // 패스워드 불일치
                    case 3:
                        alert(parsed_data.msg);
                        alert(parsed_data.tryMsg);
                        window.location.assign("/#login");
                        break;
                    case 4:
                        // 로그인 차단
                        alert(parsed_data.msg);
                        alert(parsed_data.tryMsg);
                        window.location.assign("/");
                        break;
                }
            } catch (err) {
                window.location.reload(true);
            }
        });//post
    });//login_btn

    $('#logout_btn').click(function () {
        $.get("/logout", function (data, status) {
            location.reload(true);
        })

    });//logout_btn

    $("#photo_btn").click(function () {
        const origin_filepath = $("input[name=id_photo_name]").val().split("\\");
        const new_filepath = origin_filepath[origin_filepath.length - 1];
        //alert(origin_filepath);
        const send_params = {
            new_filepath,
        };

        $.post("/photo_insert", send_params, function (data, status) {

            alert(JSON.parse(data).msg);

            window.location.assign("/");
        });
    });//photo_btn

    $("#modify_submit_btn").click(function () {
        const password = $("#m_password").val();
        const name = $("#m_name").val();
        const phone = $("#m_phone").val();
        const email = $("#m_email").val();
        const address = $("#m_address").val();
        const send_params = {
            password,
            name,
            phone,
            email,
            address
        };

        $.post('/modify', send_params, function (data, status) {
            const parsed_data = JSON.parse(data);

            window.location.assign("/");
        });//post
    });//modify_submit_btn

    let withdrawYn1 = false;
    let withdrawYn2 = false;
    let withdrawYn3 = false;
    $("#delete_btn").click(function () {
        withdrawYn1 = confirm("탈퇴하실건가요?");

        if (withdrawYn1) {
            withdrawYn2 = confirm("진지하게?");

            if (withdrawYn2) {
                withdrawYn3 = confirm("아 진짜로?");

                if (withdrawYn3) {
                    $.get("/member_delete", (data, status) => {
                        const parsedData = JSON.parse(data);

                        alert(parsedData.msg);

                        window.location.href = "/";
                    });
                }
            }
        } else {
            window.location.href = "/#modify";
        }
    });
});