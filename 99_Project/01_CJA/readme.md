## Node.js 기반 프로젝트 구축

<br>

1. mkdir 99_Project
2. cd 99_Project
3. express CAM \--view-ejs
4. cd CAM
5. npm i
6. npm start
7. http://localhost:3000 확인
8. nodemon, express-session 설치

<br>

> $ npm i nodemon —save-dev
>
> $ npm i express-session

<br>

```json
  "scripts": {
    "start": "nodemon ./bin/www"	// node -> nodemon
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "express-session": "^1.16.2",	// 추가됨
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "nodemon": "^1.19.1"	// 추가됨
  }
}
```

<br>

9. app.js에 express-session 모듈 추가

```javascript
var session = require('express-session');
```

<br>

10. 사용할 라우팅 추가

```javascript
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/signup', require('./routes/signup'));
app.use('/srch', require('./routes/srch'));
```

<br>

11. 세션 사용을 위해 정보 및 쿠키 세팅

```javascript
app.use(cookieParser('yvvyoon'));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'yvvyoon',
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24000 * 60 * 60, // 24시간 쿠키 유지
  },
}));
```

<br>

12. 로그인 화면 구현

- /views/index.ejs

```html
<div class="modal" id="loginModal">	<!-- 모달 팝업 사용 -->
  <div class="modal-content" id="loginModalContent">
    <span class="close" id="loginCloseBtn">&times;</span>	<!-- 팝업 종료 버튼 -->
    <div class="row">
      <div class="col-md-5 mx-auto">
        <div id="loginDiv">
          <div class="myform form ">
            <div class="logo mb-3">
              <div class="col-md-12 text-center">
                <h1>Login</h1>
              </div>
            </div>
            <form name="login">
              <div class="form-group">
                <label for="exampleInputEmail1">아이디</label>
                <input type="text" name="loginId" id="loginId" class="form-control" aria-describedby="emailHelp" placeholder="아이디를 입력하세요.">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">비밀번호</label>
                <input type="password" name="loginPw" id="loginPw" class="form-control" aria-describedby="emailHelp" placeholder="비밀번호를 입력하세요.">
              </div>
              <div class="col-md-12 text-center ">
                <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm" id="loginBtn">로그인</button>
              </div>
              <div class="col-md-12 ">
                <div class="login-or">
                  <hr class="hr-or">
                </div>
              </div>
              <div class="form-group">
                <p class="text-center">처음이세요?
                  <a href="#" id="signupLink">회원가입</a>	<!-- 회원가입 팝업으로 이동 -->
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

<br>

13. 회원가입 화면 구현

- /views/index.ejs

```html
<div class="modal" id="signupModal">	<!-- 모달 팝업 사용-->
  <div class="modal-content" id="signupModalContent">
    <span class="close" id="signupCloseBtn">&times;</span>	<!-- 팝업 종료 버튼 -->
    <div class="row">
      <div class="col-md-5 mx-auto">
        <div id="signupDiv">
          <div class="myform form ">
            <div class="logo mb-3">
              <div class="col-md-12 text-center">
                <h1 >Signup</h1>
              </div>
            </div>
            <form name="registration">
              <div class="form-group">
                <label for="exampleInputEmail1">아이디</label>
                <input type="text" name="signupId" class="form-control" id="signupId" aria-describedby="emailHelp" placeholder="아이디를 입력하세요.">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">이름</label>
                <input type="text" name="signupName" class="form-control" id="signupName" aria-describedby="emailHelp" placeholder="이름을 입력하세요.">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">비밀번호</label>
                <input type="password" name="signupPw" class="form-control" id="signupPw" aria-describedby="emailHelp" placeholder="영문/숫자 포함 8자 이상.">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">이메일</label>
                <input type="email" name="signupEmail"  class="form-control" id="signupEmail" aria-describedby="emailHelp" placeholder="이메일을 입력하세요.">
              </div>

              <div class="col-md-12 text-center mb-3">
                <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm" id="signupBtn">회원가입</button>
              </div>
              <div class="col-md-12 ">
                <div class="form-group">
                  <p class="text-center"><a href="#" id="backToLogin">이미 계정이 있으신가요?</a></p>
                  <!-- 로그인 팝업으로 복귀 -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

<br>

14. 로그인 로직

- /public/javascripts/controller.js

```javascript
$("#toLoginPageBtn").click(function() {
  $("#loginModal").show();
  $("#signupDiv").fadeOut("fast", function() {
    $("#loginDiv").fadeIn("fast");
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
```

<br>

- /routes/login.js

```javascript
router.post('/', function(req, res, next) {
    let loginResult = {
        msg: "",
    };

    console.log(req.session.userId);
    console.log(req.body.userId);

    if(req.session.userId === req.body.userId) {
        req.session.loginState = true;
        res.redirect('/');
    } else {
        loginResult.msg = "다시 로그인하세요.";

        res.json(JSON.stringify(loginResult));
    }
});
```

<br>

15. 회원가입 로직

- /public/javascripts/controller.js

```javascript
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

// 로그인 팝업으로 복귀
$("#backToLogin").click(function() {
  $("#loginModalContent").show();
  $("#signupDiv").fadeOut("fast", function() {
    $("#loginDiv").fadeIn("fast");
  });
});
```

<br>

16. 로그인 성공 시 화면 구현

- /views/index.ejs

```ejs
<div class="container">
  <a class="navbar-brand" href="/">축잘알</a>
  <%
  	if(loginState) {
  %>
  <h3><%= loggedInName %>님, 환영합니다.</h3>
  <button class="btn btn-primary" id="logoutBtn">로그아웃</button>
```

<br>

17. 로그인 실패 시 화면 구현

- /views/index.ejs

```ejs
	<%
  	} else {
  %>
  <button class="btn btn-primary" id="toLoginPageBtn">로그인</button>
  <%
  	}
  %>
  <div class="modal" id="loginModal"...></div>
  <div class="modal" id="signupModal"...></div>
</div> 
```

<br>

18. 이력 정보 조회 화면

- /public/html/history.html
- 테이블이 아닌 \<div> 태그로 구현

```html
<div class="container">
  <h2>축산물 유통 이력 조회</h2>
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">No</div>
      <div class="col col-2">이력번호</div>
      <div class="col col-3">개체종류</div>
      <div class="col col-4">등급</div>
      <div class="col col-5">사육지</div>
    </li>
    <li class="table-row">
      <div class="col col-1" data-label="seqNo" id="seqNo">1</div>
      <div class="col col-2" data-label="histNo" id="histNo">002 0763 5982 9</div>
      <div class="col col-3" data-label="objKind" id="objKind">한우</div>
      <div class="col col-4" data-label="grade" id="grade">1</div>
      <div class="col col-4" data-label="breedPlace" id="breedPlace">전라남도 장흥군 장흥읍 대치길</div>
    </li>
  </ul>
</div>
```

<br>

19. 이력 정보 조회 로직

- /public/javascripts/controller.js
- 팝업 위치 조정을 위해 popupX, popupY 변수 사용

```javascript
$("#srchBtn").click(function() {
  const popupX = (document.body.offsetWidth / 2) - (1024 / 2);
  const popupY = (document.body.offsetHeight / 2) - (200 / 2);
  const lotNo = $("#lotNo").val();
  const srchLotNo = {
    lotNo,
  };

  $.post("/srch", srchLotNo, function(data, status) {
    const parsedData = JSON.parse(data);

    alert(parsedData.msg);
  });

  window.open("../html/history.html", "_blank", "width=1024px; height=768px; left=" + popupX + "top=" + popupY);
});
```

<br>

20. Google Font API 사용

- /views/index.ejs

```html
<link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700|Noto+Serif+KR&display=swap&subset=korean" rel="stylesheet">
```

- /public/stylesheets/bootstrap.css

```css
html {
  font-family: 'Nanum Gothic', sans-serif;
}
```

- /public/stylesheets/main.css
- /public/stylesheets/history.css

```css
body {
    font-family: 'Nanum Gothic', sans-serif;
}
```

<br>