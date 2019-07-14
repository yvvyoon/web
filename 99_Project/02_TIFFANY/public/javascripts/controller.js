$(document).ready(function () {
    $("#signupBtn").click(function () {
        const signupId = $("#signupId").val();
        const signupPw = $("#signupPw").val();
        const userGroup = $("input[name='userGroup']:checked").val();   // 클릭한 라디오버튼의 값을 가져옴
        const signupData = {
            signupId,
            signupPw,
            userGroup,
        };

        $.post("/signup", signupData, function (data, status) {
            const parsedData = JSON.parse(data);

            alert(signupId + " : " + signupPw + " : " + userGroup);
            alert(parsedData.msg);
        });
    });

    $("#loginBtn").click(function () {
        const loginId = $("#loginId").val();
        const loginPw = $("#loginPw").val();
        const loginData = {
            loginId,
            loginPw,
        };

        $.post("/login", loginData, function (data, status) {
            const parsedData = JSON.parse(data);

            alert(loginId + " : " + loginPw);
            alert(parsedData.msg);

            try {
                $("#loginId").val() = "";
                $("#loginPw").val() = "";
            } catch (err) {
                window.location.reload(true);
            }

            window.location.reload(true);

        });
    });

    $("#logoutBtn").click(function () {
        alert("ㅅㅂ");

        $.get("/logout", function (data, status) {
            alert("Good bye.");
            alert(JSON.parse(data).msg);

            window.location.reload(true);
        });
    });

    // $("#myInfoUpdateBtn").click(function() {
    //    alert("내 정보 수정");
    //
    //    window.location.assign("/myInfoUpdate");
    //    // $.get("/myInfoUpdate", function(data, status) {
    //    //
    //    // });
    // });
    //
    // $("#eventRegistBtn").click(function () {
    //     alert("이벤트 등록");
    //
    //     window.location.assign("/eventRegist");
    // });

    $("#eventStart").datetimepicker({
        language: "ko",
        pickTime: false,
        defaultDate: new Date(),
    });

    $("#eventEnd").datetimepicker({
        language: "ko",
        pickTime: false,
        defaultDate: new Date(),
    });

    $("#fileInput").on("change", function () {
        let fileName = "";

        if (window.FileReader) {
            console.log("FileReader 진입 성공");

            fileName = $(this)[0].files[0].name;
            console.log("FileReader 진입 성공2");
        } else {
            // IE 구버전용
            fileName = $(this).val().split('/').pop().split('\\').pop();
        }

        $("#userfile").val(fileName);
    });


    // // Initialize Tooltip
    // $('[data-toggle="tooltip"]').tooltip();
    //
    // // Add smooth scrolling to all links in navbar + footer link
    // $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
    //
    //     // Make sure this.hash has a value before overriding default behavior
    //     if (this.hash !== "") {
    //
    //         // Prevent default anchor click behavior
    //         event.preventDefault();
    //
    //         // Store hash
    //         var hash = this.hash;
    //
    //         // Using jQuery's animate() method to add smooth page scroll
    //         // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    //         $('html, body').animate({
    //             scrollTop: $(hash).offset().top
    //         }, 900, function () {
    //
    //             // Add hash (#) to URL when done scrolling (default click behavior)
    //             window.location.hash = hash;
    //         });
    //     } // End if
    // });
});