$(document).ready(function() {
    $.ajax({
        type:'post',
        url:'../../../alarm/alarmCheck',
        success:function(data) {
            $('.newAlarmRed').remove();
            if(data!==0) {
                const e = '<div class="newAlarmRed">' + data + '</div>';
                $('#alarmButton, #shirinkedAlarmButton, #dmAlarmButton').prepend(e);
            }
        },
        error:function() {
        }
    });

    $alarmMain = $('#alarmMain');

    $('#alarmModal').on('click', function(event) {
        event.preventDefault();
        if(event['target']===$(this)['0']) {
            $('.navbar').css('display', 'block');
            $(this).css('display', 'none');
        }
    });
    $('#alarmButton, #openAlarmModal, #shirinkedAlarmButton, #dmAlarmButton').on('click', function(event) {
        event.preventDefault();
        $('#searchModal').css('display', 'none');
        $('#searchInput').val('');
        $alarmMain.empty();
        $('.newAlarmRed').remove();
        $('#alarmModal').css('display', 'block');
        $('.navbar').css('display', 'none');
        $.ajax({
            type:'post',
            url:'../../../alarm/alarmList',
            success:function(data) {
                if(data.length==0) {
                    let e = '';
                    e += '<div class="amNothing">새로운 알림이 없습니다.</div>';
                    $('#alarmMain').append(e);
                }
                data.forEach(function(dto) {
                    $('.amNothing').remove();
                    const alarm = dto['alarm'];
                    const content = alarm['content'];
                    const fromuser = alarm['fromuser'];
                    const touser = alarm['touser'];
                    const photo = dto['photo'];
                    const time = dto['time'];
                    let e = '';
                    if(content.indexOf('follow')==-1 && content.indexOf('request')==-1) {
                        const index1 = content.indexOf('/');
                        const coreContent = content.substring(0, index1);
                        let restContent = content.substring(index1+1);
                        const index2 = restContent.indexOf('/');
                        let boardid = restContent.substring(0, index2);
                        boardid = boardid.substring(boardid.indexOf('d')+1);
                        let realContent = '';
                        e += '<button class="othersAlarm">';
                        e += '<input type="hidden" name="boardid" value="'+boardid+'">';
                        e += '<img src="'+photo+'">';
                        if(coreContent=='boardTag') realContent = fromuser + '님이 게시물에 회원님을 태그했습니다.';
                        else if(coreContent=='commentTag') realContent = fromuser + '님이 댓글에서 회원님을 언급했습니다.';
                        else if(coreContent=='boardHeart') realContent = fromuser + '님이 회원님의 게시물을 좋아합니다.';
                        else if(coreContent=='commentHeart') realContent = fromuser + '님이 회원님의 댓글을 좋아합니다.';
                        else if(coreContent=='boardComment') realContent = fromuser + '님이 댓글을 남겼습니다.';
                        e += '<div class="alarmContent">'+realContent+'<span class="alarmTime">&nbsp'+time+'</span></div></button>';
                    } else if(content=='follow' || content=='followed' || content=='requested') {
                        e += '<button class="followAlarm">';
                        e += '<input type="hidden" name="username" value="'+fromuser+'">';
                        e += '<img src="'+photo+'">';
                        e += '<div class="alarmContent">'+fromuser+'님이 회원님을 팔로우하기 시작했습니다.<span class="alarmTime">&nbsp'+time+'</span></div>';
                        e += '<div class="followOrNotWrapper">';
                        if(content=='follow')
                            e += '<div class="followOrNot followDivBlue">팔로우</div></div></button>';
                        else if(content=='followed')
                            e += '<div class="followOrNot followDivGray">팔로윙</div></div></button>';
                        else if(content=='requested')
                            e += '<div class="followOrNot followDivGray">요청됨</div></div></button>';
                    } else if(content=='followrequest') {
                        e += '<button class="followRequestAlarm">';
                        e += '<input type="hidden" name="username" value="'+fromuser+'">';
                        e += '<img src="'+photo+'">';
                        e += '<div class="alarmContent">'+fromuser+'님이 팔로우를 요청했습니다.<span class="alarmTime">&nbsp'+time+'</span></div>';
                        e += '<div class="frCheckDelWrapper">';
                        e += '<div class="frCheck">확인</div>';
                        e += '<div class="frDel">삭제</div></div></button>';
                    }
                    $alarmMain.append(e);
                });
            }
        });
    });
    function removeAndAdd(element, remove, add) {
        element.removeClass(remove);
        element.addClass(add);
    }
    $alarmMain.on('click', '.followOrNot', function(event) {
        event.stopPropagation();
        $this = $(this);
        const fromuser = $this.closest('.followAlarm').find('input[name="username"]').val();
        const text = $this.text();
        let flag = -2;
        if(text=='요청됨') {
            $.ajax({
                type:'post',
                url:'../../../board/frFollowUpdate',
                data:{following:fromuser ,flag:-1},
                success:function(data) {
                    if(data=='delete') {
                        $this.text('팔로우');
                        removeAndAdd($this, 'followDivGray', 'followDivBlue');
                    }
                }
            });
        } else {
            if(text=='팔로우') flag = 0;
            else flag = -1;
            $.ajax({
                type:'post',
                url:'../../../board/followUpdate',
                data:{following:fromuser, flag:flag},
                success:function(data) {
                    if(data=='delete') {
                        $this.text('팔로우');
                        removeAndAdd($this, 'followDivGray', 'followDivBlue');
                    } else if(data=='request') {
                        $this.text('요청됨');
                        removeAndAdd($this, 'followDivBlue', 'followDivGray');
                    } else {
                        $this.text('팔로윙');
                        removeAndAdd($this, 'followDivBlue', 'followDivGray');
                    }
                },
                error:function() {
                    alert('오류! 관리자에게 문의');
                }
            });
        }

    })
    $alarmMain.on('click', '.frCheck', function(event) {
        event.stopPropagation();
        $this = $(this);
        const following = $('#loggedInUsername').text();
        const follower = $this.closest('.followRequestAlarm').find('input[name="username"]').val();
        const photo = $this.closest('.followRequestAlarm').find('img').attr('src');
        const time = '방금';
        $.ajax({
            type:'post',
            url:'../../../board/frFollowUpdate',
            data:{follower:follower, flag:0},
            success:function(data) {
                console.log(data);
                let e = '';
                e += '<button class="followAlarm">';
                e += '<input type="hidden" name="username" value="'+follower+'">';
                e += '<img src="'+photo+'">';
                e += '<div class="alarmContent">'+follower+'님이 회원님을 팔로우하기 시작했습니다.<span class="alarmTime">&nbsp'+time+'</span></div>';
                e += '<div class="followOrNotWrapper">';
                if(data=='follow')
                    e += '<div class="followOrNot followDivBlue">팔로우</div></div></button>';
                else if(data=='followed')
                    e += '<div class="followOrNot followDivGray">팔로윙</div></div></button>';
                else if(data=='requested')
                    e += '<div class="followOrNot followDivGray">요청됨</div></div></button>';
                $this.closest('.followRequestAlarm').remove();
                $alarmMain.prepend(e);
            },
            error:function() {
            }
        });
    });
    $alarmMain.on('click', '.frDel', function(event) {
        event.stopPropagation();
        const follower = $(this).closest('.followRequestAlarm').find('input[name="username"]').val();
        $.ajax({
            type:'post',
            url:'../../../alarm/alarmDelete',
            data:{fromuser:follower, content:"followrequest"},
            success:function(data) {
                $(this).closest('.followRequestAlarm').remove();
            }
        });
    });
    $alarmMain.on('click', 'button', function(event) {
        const boardid = $(this).closest('.othersAlarm').find('input[name="boardid"]').val();
        if(boardid!=undefined) {
            location.href="../../../view/"+boardid+"/";
        }
    });
});