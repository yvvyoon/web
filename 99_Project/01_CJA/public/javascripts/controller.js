$(document).ready(function() {
    $("#toLoginPageBtn").click(function() {
        $("#loginModal").show();
        $("#signupDiv").fadeOut("fast", function() {
            $("#loginDiv").fadeIn("fast");
        });
    });

    $("#signupBtn").click(function() {
        const signupId = $("#signupId").val();
        const signupPw = $("#signupPw").val();
        const signupName = $("#signupName").val();
        const signupEmail = $("#signupEmail").val();
        const signupData = {
            userId : signupId,
            userPw : signupPw,
            userName : signupName,
            userEmail : signupEmail,
        };

        $.post('/signup', signupData, function(data, status) {
            alert(JSON.parse(data).msg);
        });
    });

    $("#loginBtn").click(function () {
        const loginId = $("#loginId").val();
        const loginPw = $("#loginPw").val();
        const loginData = {
            userId : loginId,
            userPw : loginPw,
        };

        $.post('/login', loginData, function(data, status) {
            const parsedData = JSON.parse(data);

            try {
                $("#loginId").val() = "";
            } catch(err) {
                alert(parsedData.msg);

                window.location.reload(true);
            }
        });
    });

    $("#loginCloseBtn").click(function() {
        $("#loginModal").hide();
    });

    $("#signupCloseBtn").click(function() {
        $("#signupModal").hide();
        $("#loginModal").hide();
    });

    $("#signupLink").click(function() {
        $("#signupModal").show();
        $("#loginDiv").fadeOut("fast", function() {
            $("#signupDiv").fadeIn("fast");
        });
    });

    $("#backToLogin").click(function() {
        $("#loginModalContent").show();
        $("#signupDiv").fadeOut("fast", function() {
            $("#loginDiv").fadeIn("fast");
        });
    });

    $("#logoutBtn").click(function() {
        $.get('/logout', function(data, status) {
            location.reload();
        });
    });

    $("#srchBtn").click(function() {
        const popupX = (document.body.offsetWidth / 2) - (1024 / 2);
        const popupY = (document.body.offsetHeight / 2) - (200 / 2);
        const lotNo = $("#lotNo").val();
        const srchLotNo = {
            lotNo,
        };

        // if(!req.session) {
        //     alert("로그인 후에 서비스 이용이 가능합니다.");
        // } else {
            $.post("/srch", srchLotNo, function(data, status) {
                const parsedData = JSON.parse(data);

                alert(parsedData.msg);
            });

            window.open("../html/history.html", "_blank", "width=1024px; height=768px; left=" + popupX + "top=" + popupY)
        // }
    });
});