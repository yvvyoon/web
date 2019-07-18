$(document).ready(function () {
    // 회원가입
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

            alert(parsedData.msg);
        });
    });

    // 로그인
    $("#loginBtn").click(function () {
        const loginId = $("#loginId").val();
        const loginPw = $("#loginPw").val();
        const loginData = {
            loginId,
            loginPw,
        };

        $.post("/login", loginData, function (data, status) {
            const parsedData = JSON.parse(data);

            // 입력한 ID가 있을 때
            if (parsedData.flag === true) {
                alert(parsedData.msg);

                window.location.reload(true);
            // 입력한 ID가 없을 때
            } else {
                alert(parsedData.msg);
            }
        });
    });

    // 로그아웃
    $("#logoutBtn").click(function () {
        $.get("/logout", function (data, status) {
            window.location.href = "/";
        });
    });

    // 이벤트 등록
    $("#eventRegistSubmitBtn").click(function () {
        const eventName = $("#eventName").val();
        const eventStart = $("#eventStart").val();
        const eventEnd = $("#eventEnd").val();
        const eventPlace = $("#eventPlace").val();
        const eventArea = $("#eventArea").val();
        const ticketIssueQty = $("#ticketIssueQty").val();
        const saleOrgPrc = $("#saleOrgPrc").val();
        const priceLimit = $("#priceLimit").val();
        // const filePath = $("#filePath").val();
        const eventDesc = $("#eventDesc").val();
        const eventRegistData = {
            eventName,
            eventStart,
            eventEnd,
            eventPlace,
            eventArea,
            ticketIssueQty,
            saleOrgPrc,
            priceLimit,
            // new_filepath,
            eventDesc,
        };
        // 추가 등록 여부 변수
        let registYn = true;

        $.post("/eventRegist", eventRegistData, function (data, status) {
            const parsedData = JSON.parse(data);

            alert(parsedData.msg);

            registYn = confirm("계속해서 이벤트를 등록하시겠어요?");

            // 이벤트를 계속 등록한다면 이벤트 등록 페이지 다시 호출, 아니면 index로 이동
            if (registYn) {
                window.location.reload(true);
            } else {
                window.location.href = "/";
            }
        });
    });

    // 내 정보 수정
    $("#myInfoUpdateSubmitBtn").click(function () {
        const updatePw = $("#updatePw").val();
        const updateUserGroup = $("input[name='updateUserGroup']:checked").val();
        const myInfoUpdateData = {
            updatePw,
            updateUserGroup,
        };

        $.post("/myInfoUpdate", myInfoUpdateData, function (data, status) {
            const parsedData = JSON.parse(data);

            alert(parsedData.msg);

            window.location.href = "/login";
        });
    });

    // 탈퇴
    let withdrawYn1 = false;
    let withdrawYn2 = false;
    let withdrawYn3 = false;

    $("#withdrawBtn").click(function () {
        withdrawYn1 = confirm("탈퇴하실건가요?");

        if (withdrawYn1) {
            withdrawYn2 = confirm("진지하게?");

            if (withdrawYn2) {
                withdrawYn3 = confirm("아 진짜로?");

                if (withdrawYn3) {
                    $.get("/withdraw", (data, status) => {
                        const parsedData = JSON.parse(data);

                        alert(parsedData.msg);

                        window.location.href = "/";
                    });
                }
            }
        } else {
            window.location.href = "/myInfoUpdate";
        }
    });


    // Football 이미지 클릭
    $("#footballImg").click(function () {
        window.location.href = "/searchEventInfo";
    });

    // Basketball 이미지 클릭
    $("#basketballImg").click(function () {
        alert("준비 중입니다.");
    });

    // Baseball 이미지 클릭
    $("#baseballImg").click(function () {
        alert("준비 중입니다.");
    });

    // Concert 이미지 클릭
    $("#concertImg").click(function () {
        alert("준비 중입니다.");
    });

    // Musical 이미지 클릭
    $("#musicalImg").click(function () {
        alert("준비 중입니다.");
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