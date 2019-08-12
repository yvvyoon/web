let phone_field_length = 0;

function TabNext(obj, event, len, next_field) {
    if (event === "down") {
        phone_field_length = obj.value.length;
    } else if (event === "up") {
        if (obj.value.length != phone_field_length) {
            phone_field_length = obj.value.length;
            if (phone_field_length == len) {
                next_field.focus();
            }
        }
    }
}

function checkImgSize(obj, size) {
    var check = false;
    if (window.ActiveXObject) {
        //IE용인데 IE8이하는 안됨...
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        //var filepath = document.getElementById(obj).value;
        var filepath = obj[0].value;
        var thefile = fso.getFile(filepath);
        sizeinbytes = thefile.size;
    } else {//IE 외
        //sizeinbytes = document.getElementById(obj).files[0].size;
        sizeinbytes = obj[0].files[0].size;
    }
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    var i = 0;
    var checkSize = size;
    while (checkSize > 900) {
        checkSize /= 1024;
        i++;
    }
    checkSize = (Math.round(checkSize * 100) / 100) + ' ' + fSExt[i];
    var fSize = sizeinbytes;
    if (fSize > size) {
        alert("첨부파일은 " + checkSize + " 이하로 등록가능합니다.");
        check = false;
    } else {
        check = true;
    }
    return check;
}

document.getElementById("id_photo").onchange = function () {
    if (this.value) {
        var extPlan = "JPG, PNG, JPEG";
        var checkSize = 1024 * 1024 * 4;	// 5MB
        if (!checkImg($('#id_photo'), extPlan) | !checkImgSize($('#id_photo'), checkSize)) {
            this.value = "";
            return;
        }
    }
}

function checkImg(obj, ext) {
    var check = false;
    var extName = $(obj).val().substring($(obj).val().lastIndexOf(".") + 1).toUpperCase();
    var str = ext.split(",");
    for (var i = 0; i < str.length; i++) {
        if (extName == $.trim(str[i])) {
            check = true;
            break;
        } else check = false;
    }
    if (!check) {
        alert(ext + " 파일만 업로드 가능합니다.");
    }
    return check;
}