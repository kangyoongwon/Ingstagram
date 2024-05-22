$(document).ready(function() {
    $('#boardMenuModal1, #boardMenuModal2').on('click', function() {
        if(event['target']===$(this)['0']) {
            $(this).css('display', 'none');
        }
    });
    $('#closeModalBtn1, #closeModalBtn2').on('click', function() {
        $('#boardMenuModal1').css('display', 'none');
    });
    $('#content1').on('click', '#menuButton', function() {
        $.ajax({
            type:'post',
            url:'../../../board/followOrMine',
            data:{boardid:$('#content1').attr('class')},
            success:function(data) {
                console.log(data);
                console.log(typeof data);
                if(data==1) {
                    $('#boardMenuModal2').css('display', 'block');
                }
                else if(data==0) {
                    $('#followOrNot').text('팔로우 취소');
                    $('#followOrNot').css('color', 'red');
                    $('#boardMenuModal1').css('display', 'block');
                }
                else {
                    $('#followOrNot').text('팔로우');
                    $('#followOrNot').css('color', 'blue');
                    $('#boardMenuModal1').css('display', 'block');
                }
            },
            error:function(data) {
                alert('오류! 관리자에게 문의 바람');
            }
        });
    });
    $('#deleteMine').on('click', function() {
        const boardid = $('#content1').attr('class');
        $.ajax({
            type:'post',
            url:'../../../board/boardDelete',
            data:{boardid:boardid},
            success:function(data) {
                $('#boardMenuModal2').css('display', 'none');
                $('#boardViewModalContainer').css('display', 'none');
                history.replaceState({}, '', originalUrl);
                location.href = './';
            }
        });
    });
    $('#followOrNot').on('click', function() {
        const text = $(this).text();
        const boardid = $('#content1').attr('class');
        const username = $('#boardViewModalBody input[name="username"]').val();
        let flag = 1;
        if(text=='팔로우 취소') flag = -1;
        else flag = 0;
        $.ajax({
            type:'post',
            url:'../../../board/followUpdate',
            data:{following:username, flag:flag},
            success:function(data) {
                if(flag==-1) {
                    $('#followOrNot').text('팔로우');
                    $('#followOrNot').css('color', 'blue');
                } else {
                    $('#followOrNot').text('팔로우 취소');
                    $('#followOrNot').css('color', 'red');
                }
            },
            error:function() {
            }
        });

    });
    $('.moveToView').on('click', function() {
        const boardid = $('#content1').attr('class');
        location.href = '../../../view/' + boardid + '/';
    });
    $('.copyLink').on('click', function() {
        let currLoc = location.href;

        navigator.clipboard.write(currLoc);
        $('#boardMenuModal1, #boardMenuModal2').css('display', 'none');
    });
});