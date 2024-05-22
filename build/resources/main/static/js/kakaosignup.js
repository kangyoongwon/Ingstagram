function Klag() {
    this.nameKlag = false;
    this.usernameKlag = false;
    this.bdateKlag = false;
}
Klag.prototype.updKlag = function(klagNum) {
    if(klagNum===1) this.nameKlag = true;
    else if(klagNum===2) this.usernameKlag = true;
    else this.bdateKlag = true;
}
Klag.prototype.updKlagg = function(klagNum) {
    if(klagNum===1) this.nameKlag = false;
    else if(klagNum===2) this.usernameKlag = false;
    else this.bdateKlag = false;
}
let klags = new Klag();

function enableButtonK() {
    console.log(klags.nameKlag, klags.usernameKlag, klags.bdateKlag);
    if(klags.nameKlag && klags.usernameKlag && klags.bdateKlag) {
        $('#signupK').removeAttr('disabled');
        $('#signupK').css('background-color', '#235eff');
    }
    else {
        $('#signupK').attr('disabled', true);
        $('#signupK').css('background-color', '#6499FF');
    }
}
function displayNoneOrNotK(e, flag) {
    if(flag) e.css('display', 'none');
    else e.css('display', 'block');
}
function giveWarningK(number) {
    if(number==1) {
        if(klags.nameKlag) displayNoneOrNotK($('.emailSignupCheck:nth-of-type(1)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(1)'), false);
    } else if(number==2) {
        if(klags.usernameKlag) displayNoneOrNotK($('.emailSignupCheck:nth-of-type(2)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(2)'), false);
    } else {
        if(klags.bdateKlag) displayNoneOrNotK($('.emailSignupCheck:nth-of-type(3)'), true);
        else displayNoneOrNot($('.emailSignupCheck:nth-of-type(3)'), false);
    }
}
function sendAjaxK(url, checkData, klagNum) {
    $.ajax({
        type:'post',
        url:url,
        data:{data:checkData},
        success:function(data) {
            if(data) klags.updKlag(klagNum);
            else klags.updKlagg(klagNum);
        },
        error:function(data) {
            alert("오류 발생");
        }
    });
}
$(document).ready(function() {
    $('input[name="name"]').on('keyup blur', function() {
        checkWithEnter(event, $('#signupK'));
        let name = trimData($('input[name="name"]').val());
        if(!checkName(name)) {
            klags.updKlagg(1);
            enableButtonK();
            giveWarningK(1);
            return false;
        }
        klags.updKlag(1);
        enableButton();
        giveWarningK(1);
    });
    $('input[name="username"]').on('keyup blur', function(evnet) {
        checkWithEnter(event, $('#signupK'));
        let username = trimData($('input[name="username"]').val());
        if(!checkUsername(username)) {
            klags.updKlagg(2);
            enableButtonK();
            giveWarningK(2);
            return false;
        }
        sendAjaxK("checkUsername", username, 2);
        enableButtonK();
        giveWarningK(2);
    });
    $('input[name="birthdate"]').on('input blur', function() {
        checkWithEnter(event, $('#signupK'));
        if($('input[name="birthdate"]').val().length==0) {
            klags.updKlagg(3);
            enableButtonK();
            giveWarningK(3);
            return false;
        }
        klags.updKlag(3);
        enableButtonK();
        giveWarningK(3);
    });
});