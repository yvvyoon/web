$(document).ready(function() {
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const popupWidth = $("#modal").width();
    const popupHeight = $("#modal").height();

    $("#signupBtn").click(function() {
        const signupId = $("#signupId").val();
        const signupPw = $("#signupPw").val();
        const signupName = $("#signupName").val();
        const signupEmail = $("#signupEmail").val();
        const signupData = {
            signupId,
            signupPw,
            signupName,
            signupEmail
        };

        $.post('/signup', signupData, function(data, status) {
            alert(JSON.parse(data).msg);
        });
    });

    $("#toLoginPageBtn").click(function() {
        // $("#modal").css({
        //     "position": "absolute",
        //     "top": windowHeight / 2 - popupHeight / 2,  // 788 / 2 - 56 / 2
        //     "left": windowWidth / 2 - popupWidth / 4    // 1440 / 2 - 1440 / 4
        // });

        $("#loginModal").show();
        $("#signupDiv").fadeOut("fast", function() {
            $("#loginDiv").fadeIn("fast");
        });
    });

    $("#loginBtn").click(function () {
        const loginId = $("#loginId").val();
        const loginPw = $("#loginPw").val();
        const loginData = {
            loginId,
            loginPw
        };

        $.post('/login', loginData, function(data, status) {
            try {
                $("#loginId").val() = "";
            } catch(err) {
                alert(JSON.parse(data).msg);

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

    // $("#backToLogin").click(function() {
    //     $("#loginModal").show();
    //     $("#signupDiv").fadeOut("fast", function() {
    //         $("#loginDiv").fadeIn("fast");
    //     });
    // });

    $("#logoutBtn").click(function() {
        $.get('/logout', function(data, status) {
            location.reload();
        });
    });

    $("#srchBtn").click(function() {
        const popupX = (document.body.offsetWidth / 2) - (200 / 2);
        const popupY = (document.body.offsetHeight / 2) - (200 / 2);
        const lotNo = $("#lotNo").val();
        const srchLotNo = {
            lotNo,
        };

        $.post("/srch", srchLotNo, function(data, status) {
            const srchRslt = JSON.parse(data);

            alert(srchRslt.msg);
        });

        $.post("/srch", srchLotNo,
            window.open("html/history.html", "_blank", "width=1280px; height=960px; left=" + popupX + "top=" + popupY)
        );
    });

    // $(function() {
    //     $("form[name='login']").validate({
    //         rules: {
    //
    //             email: {
    //                 required: true,
    //                 email: true
    //             },
    //             password: {
    //                 required: true,
    //
    //             }
    //         },
    //         messages: {
    //             email: "Please enter a valid email address",
    //
    //             password: {
    //                 required: "Please enter password",
    //
    //             }
    //
    //         },
    //         submitHandler: function(form) {
    //             form.submit();
    //         }
    //     });
    // });
    //
    //
    //
    // $(function() {
    //
    //     $("form[name='registration']").validate({
    //         rules: {
    //             firstname: "required",
    //             lastname: "required",
    //             email: {
    //                 required: true,
    //                 email: true
    //             },
    //             password: {
    //                 required: true,
    //                 minlength: 5
    //             }
    //         },
    //
    //         messages: {
    //             firstname: "Please enter your firstname",
    //             lastname: "Please enter your lastname",
    //             password: {
    //                 required: "Please provide a password",
    //                 minlength: "Your password must be at least 5 characters long"
    //             },
    //             email: "Please enter a valid email address"
    //         },
    //
    //         submitHandler: function(form) {
    //             form.submit();
    //         }
    //     });
    // });
});