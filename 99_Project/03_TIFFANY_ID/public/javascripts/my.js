$(document).ready(function(){
    let signupFlag = false;

    $("#signup_btn").click(function(){
        const id = $("#id").val();
        const name = $("#name").val();
        const password = $("#password").val();
        const id_num = $("#id_num").val();
        const phone = $("#phone").val();
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

        if (signupFlag === true) {
            $.post('/member_insert',send_params,function(data, status){
                const parsed_data = JSON.parse(data);

                $("#sign_up_div").html("<h1>"+parsed_data.msg+"</h1>");
            });//post
        } else {
            alert("가입이 완료되지 않았습니다.")
        }
    });//signup_btn

    $('#password').change(function() {
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


    $('#login_btn').click(function(){
        const login_id = $('#login_id').val();
        const login_pwd = $("#login_pwd").val();

        const send_params = {
            login_id,
            login_pwd
        }
        
        $.post('/login',send_params,function(data,status){
            try{
                const parsed_data=JSON.parse(data);
                
                alert(parsed_data.msg);
                window.location.assign("/");
            }catch(err){
                window.location.reload(true);
            }

        });//post
    });//login_btn


    $('#logout_btn').click(function(){
        $.get("/logout",function(data,status){
            location.reload(true);
        })
        
    });//logout_btn

    $("#photo_btn").click(function(){
        const origin_filepath = $("input[name=id_photo_name]").val().split("\\");
        const new_filepath = origin_filepath[origin_filepath.length-1];
        //alert(origin_filepath);
        const send_params = {
            new_filepath
        }
        $.post("/photo_insert",send_params,function(data,status){
            
            alert(JSON.parse(data).msg);

            window.location.assign("/");
        });
    });//photo_btn

    $("#modify_submit_btn").click(function(){
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
        $.post('/modify',send_params,function(data,status){
            const parsed_data = JSON.parse(data);
            
            window.location.assign("/");

        });//post
    });//modify_submit_btn


    let withdrawYn1 = false;
    let withdrawYn2 = false;
    let withdrawYn3 = false;
    $("#delete_btn").click(function(){
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