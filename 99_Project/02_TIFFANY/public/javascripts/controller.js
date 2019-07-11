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

        alert(signupId + " : " + signupPw + " : " + userGroup);

        $.post("/signup", signupData, function (data, status) {
            const parsedData = JSON.parse(data);

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

        alert(loginId + " : " + loginPw);

        $.post("/login", loginData, function(data, status) {
            const parsedData = JSON.parse(data);

            alert(parsedData.msg);

            try {
                $("#loginId").val() = "";
                $("#loginPw").val() = "";
            } catch(err) {
                window.location.reload(true);
            }
        });
    });

    $("#logoutBtn").click(function() {
       $.get("/logout", function(data, status) {
            alert("Good bye.");
       });
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