
function Flag() {
    this.emailFlag = false;
    this.nameFlag = false;
    this.usernameFlag = false;
    this.passwordFlag = false;
}
Flag.prototype.updFlag = function(flagNum) {
    if(flagNum===1) this.emailFlag = true;
    else if(flagNum===2) this.nameFlag = true;
    else if(flagNum===3) this.usernameFlag = true;
    else this.passwordFlag = true;
}
Flag.prototype.updFlagg = function(flagNum) {
    if(flagNum===1) this.emailFlag = false;
    else if(flagNum===2) this.nameFlag = false;
    else if(flagNum===3) this.usernameFlag = false;
    else this.passwordFlag = false;
}
let flags = new Flag();



function checkEmail(email) {
    if(!email) return false;
    if(email.length==0) return false;
    const index = email.indexOf('@');
    if(index==-1) return false;
    if(email.indexOf('.', index)==-1) return false;
    return true;
}
function checkName(name) {
    if(!name) return false;
    if(name.length==0) return false;
    return true;
}
function checkUsername(username) {
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const pattern_spc = /[~!@#$%^&*()+|<>?:{}]/;
    if(!username) return false;
    if(username.length==0) return false;
    if(username.length<=5) return false;
    if(username.length>=21) return false;
    if(pattern_spc.test(username)) return false;
    if(pattern_kor.test(username)) return false;
    return true;
}
function checkPassword(password) {
    if(!password) return false;
    if(password.length==0) return false;
    if(password.length<=7) return false;
    if(password.length>=21) return false;
    return true;
}
function sendAjax(url, checkData, flagNum) {
    $.ajax({
        type:'post',
        url:url,
        data:{data:checkData},
        success:function(data) {
            if(data) flags.updFlag(flagNum);
            else flags.updFlagg(flagNum);
        },
        error:function(data) {
            alert("오류 발생");
        }
    });
}
function enableButton() {
    if(flags.emailFlag && flags.nameFlag && flags.usernameFlag && flags.passwordFlag) {
        $('#signup').css('background-color', '#235eff');
        $('#signup').removeAttr('disabled');
    } else {
        $('#signup').css('background-color', '#6499FF');
        $('#signup').attr('disabled', true);
    }
}
function checkWithEnter(event, target) {
    if(!target.attr('disabled')) {
        if(event.which===13) target.click();
    }
}
function displayNoneOrNot(e, flag) {
    if(flag) e.css('display', 'none');
    else e.css('display', 'block');
}
function giveWarning(number) {
    if(number==1) {
        if(flags.emailFlag) displayNoneOrNot($('.emailSignupCheck:nth-of-type(1)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(1)'), false);
    } else if(number==2) {
        if(flags.nameFlag) displayNoneOrNot($('.emailSignupCheck:nth-of-type(2)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(2)'), false);
    } else if(number==3) {
        if(flags.usernameFlag) displayNoneOrNot($('.emailSignupCheck:nth-of-type(3)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(3)'), false);
    } else {
        if(flags.passwordFlag) displayNoneOrNot($('.emailSignupCheck:nth-of-type(4)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(4)'), false);
    }
}
$(document).ready(function() {
    $('input[name="email"]').on('keyup blur', function(event) {
        let email = trimData($('input[name="email"]').val());
        checkWithEnter(event, $('#signup'));
        if(!checkEmail(email)) {
            flags.updFlagg(1);
            enableButton();
            giveWarning(1);
            return false;
        }
        sendAjax('checkEmail', email, 1);
        enableButton();
        giveWarning(1);
    });
    $('input[name="name"]').on('keyup blur', function(evnet) {
        let name = trimData($('input[name="name"]').val());
        checkWithEnter(event, $('#signup'));
        if(!checkName(name)) {
            flags.updFlagg(2);
            enableButton();
            giveWarning(2);
            return false;
        }
        flags.updFlag(2);
        enableButton();
        giveWarning(2);
    });
    $('input[name="username"]').on('keyup blur', function(evnet) {
        let username = trimData($('input[name="username"]').val());
        checkWithEnter(event, $('#signup'));
        if(!checkUsername(username)) {
            flags.updFlagg(3);
            enableButton();
            giveWarning(3);
            return false;
        }
        sendAjax("checkUsername", username, 3);
        enableButton();
        giveWarning(3);
    });
    $('input[name="password"]').on('keyup blur', function(event) {
        let password = trimData($('input[name="password"]').val());
        checkWithEnter(event, $('#signup'));
        if(!checkPassword(password)) {
            flags.updFlagg(4);
            enableButton();
            giveWarning(4);
            return false;
        }
        flags.updFlag(4);
        enableButton();
        giveWarning(4);
    });
    $('#signup').on('click', function(event) {
        $('#basicInfo').css('display', 'none');
        $('#birthdate').css('display', 'flex');
    });
    $('input[name="birthdate"]').on('focusin', function(evnet) {
        $('#next').attr('disabled', true);
        $('#next').css('background-color', '#6499FF');
    });
    $('input[name="birthdate"]').on('input blur', function(evnet) {
        checkWithEnter(event, $('#next'));
        if($('input[name="birthdate"]').val().length==0) {
            $('#next').attr('disabled', true);
            $('#next').css('background-color', '#6499FF');
            return false;
        }
        $('#next').removeAttr('disabled');
        $('#next').css('background-color', '#235eff');
    });
    $('#next').on('click', function(event) {
        $.ajax({
            type:'post',
            url:'sendMail',
            data:{email:$('input[name="email"]').val()},
            success:function(data) {
                console.log("success test");
            },
            error:function(data) {
                console.log("error test");
            }
        });
        const email = $('input[name="email"]').val();
        let html = '<p id="showEmail">' + email + '에서</p>'
        $('#showEmail').html(html);
        $('#showEmail').val(email);
        $('#birthdate').css('display', 'none');
        $('#certification').css('display', 'flex');
    });
    $('#back1').on('click', function(event) {
        event.preventDefault();
        $('#signup').css('background-color', '#6499FF');
        $('#signup').attr('disabled', true);
        $('#basicInfo').css('display', 'flex');
        $('#birthdate').css('display', 'none');
        $('input[name="birthdate"]').val('');
        $('input[name="password"]').val('');
    });
    $('input[name="certiNum"]').on('keyup blur', function(event) {
        const certiNum = trimData($('input[name="certiNum"]').val());
        if(!certiNum) return false;
        checkWithEnter(event, $('#finish'));
        $.ajax({
            type:'post',
            url:'checkNum',
            data:{ranNum:certiNum},
            success:function(data){
                if(data) {
                    $('#finish').removeAttr('disabled');
                    $('#finish').css('background-color', '#235eff');
                    $('.certificationAlert').css('display', 'none');
                }
                else {
                    $('#finish').attr('disabled', true);
                    $('#finish').css('background-color', '#6499FF');
                    if(certiNum.length>=6)
                    $('.certificationAlert').css('display', 'block');
                }
            },
            error:function(data){
            }
        });
    });
    $('#finish').on('click', function(event) {
        $('#memberForm').submit();
    });
    $('#back2').on('click', function(event) {
        event.preventDefault();
        $('#certification').css('display', 'none');
        $('#birthdate').css('display', 'flex');
        $('input[name="certiNum"]').val('');
    });
});