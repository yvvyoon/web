$(document).ready(function () {
    $('#memberInsertBtn').click(function() {
        const name = $('#name').val();
        const email = $('#email').val();
        const comments = $('#comments').val();
        const sendParams = {
            name,
            email,
            comments,
        };
        // JavaScript 객체를 JSON 텍스트 데이터로 변환

        $.post("/memberInsert", sendParams, function (data, status) {
            // jQuery의 post 메소드에서 stringify를 내장하고 있기 떄문에 argument로 JavaScript 객체를 사용한다.
            // alert(data +  " : " + status);

            const parsedData = JSON.parse(data);

            $("#resultMsg").html(parsedData.msg);
        });
    });

    $("#loginBtn").click(function() {
        const email = $("#loginEmail").val();
        const sendParams = {
            email,
        };

        $.post("/login", sendParams, function(data, status) {
            // const parsedData = JSON.parse(data);

            try {   // JSON 데이터가 넘어오는 경우(즉, 다른 이메일로 로그인했을 때
                alert(JSON.parse(data).msg);

                $("#loginEmail").val() = "";
            }
            catch(err) {
                window.location.reload(true);
                // location.reload()를 true로 강제 설정해줘야 알아서 login.js를 요청함
            }

            // $("#loginResultDiv").html(`<h3>Login.js ${parsedData.msg}<h3><button id='logout' style='color: black'>로그아웃</button>`);
        });
    });

    $("#logoutBtn").click(function() {
        $.get("/logout", function(data, status) {
            location.reload();
        });
    });

    $("#srchBtn").click(function() {
        const srchType = $("#srchType").val();
        const carNo = $("#carNo").val();
        const sendParams = {
            srchType,
            carNo,
        };

        $.post("/srchCarInfo", sendParams, function(data, status) {
            const parsedData = JSON.parse(data);
            let createTblTag = "<table style='border 1px solid black' id='resultTbl'>";

            $.each(parsedData.msg, function(index, item) {
                const result = item.toString().split(",");

                createTblTag += `<tr><td>${result[0]}</td><td>${result[1]}</td></tr>`;
            });

            createTblTag += "</table>";

            $("#srchResult").html(createTblTag);
        });
    });
});