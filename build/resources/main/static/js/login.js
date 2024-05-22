
function error(flag) {
    let html = '';
    if(flag==-1) html = '<p id="alert">존재하지 않는 이메일입니다.</p>';
    else html = '<p id="alert">일치하지 않는 비밀번호입니다.</p>';
    $('#alert').html(html);
}
$(document).ready(function(){
    $('input[name="email"], input[name="password"]').on('keyup', function(event) {
        console.log(!$('#loginButton').attr('disabled'));
        if(!$('#loginButton').attr('disabled')){
            if(event.which===13) $('#loginButton').click();
        }
        const email = $('input[name="email"]').val();
        const password = $('input[name="password"]').val();
        if(email && password) {
            if(email.length!=0 && password.length!=0) {
                $('#loginButton').removeAttr('disabled');
                $('#loginButton').css('background-color', '#235eff');
            } else {
                $('#loginButton').attr('disabled', true);
                $('#loginButton').css('background-color', '#6499FF');
            }
        } else {
            $('#loginButton').attr('disabled', true);
            $('#loginButton').css('background-color', '#6499FF');
        }
    });
    $('#loginButton').on('click', function() {
        const email = trimData($('input[name="email"]').val());
        const password = trimData($('input[name="password"]').val());
        $.ajax({
            type:'post',
            url:'../../../accounts/checkLogin',
            data:{email:email, password:password},
            success: function(data) {
                if(data=="-2" || data=="-1") error(data);
                else {
                    if(data==0) location.href='./';
                    else location.href = data;
                }
            },
            error: function() {
                alert("오류. 관리자에게 문의하세요.");
            }
        });
    });
    $('#kakaologin').on('click', function() {
        Kakao.init('46ab35605138b6f94159b78e8004967c');
        console.log(Kakao.isInitialized());
        Kakao.Auth.login({
            success: function (response) {
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (response) {
                        const email = response['kakao_account']['email'];
                        $.ajax({
                            type:'post',
                            url:'accounts/checkLogin',
                            data:{email:email, password:''},
                            success: function(data) {
                                if(data==-1) {
                                    $('#kakaoForm').html('<input type="hidden" value="' + email + '" name="email">');
                                    $('#kakaoForm').submit();
                                } else if(data==-2) {
                                    location.href='./';
                                }
                            },
                            error: function() {
                                alert("카카오톡 로그인 오류! 관리자에게 문의하세요.");
                            }
                        });
                    },
                    fail: function (error) {
                        console.log(error);
                    },
                })
            },
            fail: function (error) {
                console.log(error);
          },
        })
    });
});