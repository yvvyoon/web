$(document).ready(function() {
    $('#popUpSignUpBtn').click(function() {
        const signUpId = $('#signUpId').val();
        const signUpPw = $('#signUpPw').val();
        const signUpName = $('#signUpName').val();
        const signUpInfo = {
            signUpId,
            signUpPw,
            signUpName,
        };

        $.post('/signUp', signUpInfo, function(data, status) {
            const parsedData = JSON.parse(data);

            alert(parsedData.msg);
        });
    });

    $('#loginBtn').click(function() {
        const loginId = $('#loginId').val();
        const loginPw = $('#loginPw').val();
        const loginInfo = {
            loginId,
            loginPw,
        };

        $.post('/login', loginInfo, function(data, status) {
            try{
                $('#loginId').val() = '';
            }
            catch(err) {
                alert(JSON.parse(data).msg);
                window.location.reload(true);
            }
        });
    });

    $('#logoutBtn').click(function() {
        console.log('디버그1');
        $.get('/logout', function(data, status) {
            location.reload();
        });
    });
});