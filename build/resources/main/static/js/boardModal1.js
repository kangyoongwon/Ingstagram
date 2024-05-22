// bx슬라이더
function checkPause() {
    const video = document.getElementById('playingVideo');
    if(video.paused) return true;
    else return false;
}
function muteOrLoud() {
    const mute = document.getElementById('playingVideo');
    if(mute.muted) {
        mute.muted = false;
        return true;
    }
    else {
        mute.muted = true;
        return false;
    }
}

//function getFirstClass(data) {
//    data = data.substring(0, data.indexOf(' '));
//    return data;
//}
//function getLastClass(data) {
//    data = data.substring(data.lastIndexOf(' ')+1);
//    return data;
//}
//function sendAjax(url, data) {
//    $.ajax({
//        type:'post',
//        url:url,
//        data:data,
//        success:function(data) {
//        },
//        error:function() {
//            alert('오류! 관리자에게 문의');
//        }
//    });
//}
//function sendCommentAjax(url, data) {
//    $.ajax({
//        type:'post',
//        url:url,
//        data:data,
//        success:function(commentDTO) {
//            if(commentDTO['board']['structure']==1) {
//               const comment = commentDTO['board'];
//               let e1 = '<div class="contentGrid" boardid="' + comment['boardid'] + '">';
//               e1 += '<div class="profileArea">';
//               e1 += '<button class="' + comment['username'] + ' profileButton" style="';
//               e1 += "background-image:url('" + commentDTO['photo'] + "');";
//               e1 += '"></button>';
//               e1 += '</div>';
//               e1 += '<div class="contentArea">';
//               e1 += '<a href="#">' + comment['username'] + '</a> ';
//               e1 += comment['content'];
//               e1 += '<br>';
//               e1 += '<a class="time">' + comment['rdate'] + '  </a>';
//               e1 += '<a class="likes">  좋아요 ' + 0 + '개  </a>';
//               e1 += '<a href="#" class="' + comment['username'] + ' ' + comment['boardid'] + ' writeReply">  답글 달기</a>';
//               e1 += '<button boardid="' + comment['boardid'] + '" username="' + comment['username'] + '" class="commentMenuButton"></button>';
//               e1 += '</div>';
//               e1 += '<div class="heartArea">';
//               e1 += '<button class="' + comment['boardid'] + ' heartButton heartOff"></button>';
//               e1 += '</div>';
//               e1 += '</div>';
//               $('#mainContent').after(e1);
//            } else {
//                const recomment = commentDTO['board'];
//                const parentidClass = '.' + recomment['parentid'];
//                if($(parentidClass + '.replyContainer').length==0) {
//                    let e2 = '<br><a href="#" class="' + recomment['parentid'] + ' openReply">------ 답글 보기(' + 1 + '개)</a>';
//                    e2 += '<a href="#" class="' + recomment['parentid'] + ' closeReply">------ 답글 숨기기</a>';
//                    $(parentidClass + '.writeReply').after(e2);
//                    e2 = '<div class="' + recomment['parentid'] + ' replyContainer"></div>';
//                    $('.contentGrid[boardid="' + recomment['parentid'] + '"]').append(e2);
//                }
//                let e2 = '<div boardid="' + recomment['boardid'] + '" class="reply">';
//                e2 += '<div class="profileArea">';
//                e2 += '<button class="' + recomment['username'] + ' profileButton" style="';
//                e2 += "background-image:url('" + commentDTO['photo'] + "');";
//                e2 += '"></button>';
//                e2 += '</div>';
//                e2 += '<div class="reContent">';
//                e2 += '<a href="#">' + recomment['username'] + '</a> ';
//                e2 += recomment['content'];
//                e2 += '<br>';
//                e2 += '<a class="time">' + recomment['rdate'] + '  </a>';
//                e2 += '<a class="likes">  좋아요 ' +  0 + '개  </a>';
//                e2 += '<button boardid="' + recomment['boardid'] + '" username="' + recomment['username'] + '" class="commentMenuButton"></button>';
//                e2 += '</div>';
//                e2 += '<div class="heartArea">';
//                e2 += '<button class="' + recomment['boardid'] + ' heartButton heartOff"></button>';
//                e2 += '</div>';
//                e2 += '</div>';
//                $(parentidClass + '.replyContainer').prepend(e2);
//                $(parentidClass + '.replyContainer').css('display', 'block');
//                $(parentidClass + '.openReply').css('display', 'none');
//                $(parentidClass + '.closeReply').css('display', 'inline');
//            }
//        },
//        error:function() {
//            alert('오류! 관리자에게 문의해 주세요.');
//        }
//    });
//}

$(document).ready(function() {
    $('#files').on('click', '#playingVideo', function(event) {
        event.preventDefault();
        const video = $(this).get(0);
        if(checkPause()) video.play();
        else video.pause();
    });
    $('#files').on('click', '#mute', function(event) {
        event.preventDefault();
        let muteStatus = $(this).attr('class');
        const flag = muteOrLoud();
        if(flag) {
            $('#mute').removeClass('muteTrue');
            $('#mute').addClass('muteFalse');
        } else {
            $('#mute').removeClass('muteFalse');
            $('#mute').addClass('muteTrue');
        }
    });
    $('#content1').on('click', '.profileButton', function(event) {
        event.preventDefault();
        const username = getFirstClass($(this).attr('class'));
        //alert(username + '프로필 주소로 이동');
        location.href = '../../../../' + username + '/';//
    });
//    $('#content2').on('click', '.profileButton', function(event) {
//        event.preventDefault();
//        const username = getFirstClass($(this).attr('class'));
//        alert(username + '프로필 주소로 이동');
//        //location.href = 프로필 주소로 이동;//
//    });
//    $('#content2').on('click', '.openReply', function(event) {
//        event.preventDefault();
//        const boardid = '.' + getFirstClass($(this).attr('class'));
//        $(boardid + '.replyContainer').css('display', 'block');
//        $(boardid + '.openReply').css('display', 'none');
//        $(boardid + '.closeReply').css('display', 'inline');
//    });
//    $('#content2').on('click', '.closeReply', function(event) {
//        event.preventDefault();
//        const boardid = '.' + getFirstClass($(this).attr('class'));
//        $(boardid + '.replyContainer').css('display', 'none');
//        $(boardid + '.openReply').css('display', 'inline');
//        $(boardid + '.closeReply').css('display', 'none');
//    });
//    $('#content2').on('click', '.writeReply', function(event) {
//        event.preventDefault();
//        const classes = $(this).attr('class');
//        const username = getFirstClass(classes);
//        const id = classes.substring(classes.indexOf(' ')+1, classes.lastIndexOf(' '));
//        $('#writeComment').val('@' + username);
//        $('#writeComment').attr('name', 'structure2' + ' ' + id);
//        $('#writeComment').focus();
//    });
//    $('#content2').on('click', '.heartButton', function(event) {
//        event.preventDefault();
//        const classes = $(this).attr('class');
//        const boardid = getFirstClass(classes);
//        if(getLastClass(classes)=='heartOff') {
//            const data = {boardid:boardid, upDown:1};
//
//            sendAjax('heart', data);
//            $(this).removeClass('heartOff');
//            $(this).addClass('heartOn');
//        } else {
//            const data = {boardid:boardid, upDown:-1};
//            sendAjax('heart', data);
//            $(this).removeClass('heartOn');
//            $(this).addClass('heartOff');
//        }
//    });
    $('#content3').on('click', '#heartButton', function(event) {
        event.preventDefault();
        const boardid = $('#content3').attr('class');
        let data = '';
        if($(this).attr('class')=='heartOff') {
            data = {boardid:boardid, flag:0};
            $(this).removeClass('heartOff');
            $(this).addClass('heartOn');
        } else {
            data = {boardid:boardid, flag:-1};
            $(this).removeClass('heartOn');
            $(this).addClass('heartOff');
        }
        $.ajax({
            type:'post',
            url:'../../../board/longHeartUpdate',
            data:data,
            success:function(data) {
                const text = '좋아요' + data + '개';
                $('#likes').html(text);
            },
            error:function() {
            }
        });
    });
    $('#content3').on('click', '#commentButton', function(event) {
        event.preventDefault();
        $('#writeComment').focus();
    });
    $('#content3').on('click', '#directButton', function(event) {
        /////////////direct 어떻게 만들 건데???????????????
        event.preventDefault();
    });
    $('#content3').on('click', '#saveButton', function(event) {
        event.preventDefault();
        const boardid = $('#content3').attr('class');
        if($(this).attr('class')=='saveOff') {
            const data = {boardid:boardid, flag:0};
            sendAjax('saveUpdate', data);
            $(this).removeClass('saveOff');
            $(this).addClass('saveOn');
        } else {
            const data = {boardid:boardid, flag:-1};
            sendAjax('saveUpdate', data);
            $(this).removeClass('saveOn');
            $(this).addClass('saveOff');
        }
    });
//    $('#content5').on('keyup blur', '#writeComment', function(event) {
//        event.preventDefault();
//        const comment = $('#writeComment').val();
//        if($('#writeComment').val().length>0) $('#submitComment').css('display', 'inline');
//        else $('#submitComment').css('display', 'none');
//    });
//    $('#content5').on('click', '#submitComment', function() {
//        event.preventDefault();
//        const content = $('#writeComment').val();
//        const structure = $('#writeComment').attr('name');
//        if(structure.indexOf('structure2')==-1) {
//            const data = {content:content, structure:1, parentid:$('#content5').attr('class')};
//            sendCommentAjax('../../board/commentInsert', data, 1);
//        } else {
//            const data = {content:content, structure:2, parentid:getLastClass($('#writeComment').attr('name'))};
//            sendCommentAjax('../../board/commentInsert', data, 1);
//        }
//        $('#writeComment').val('');
//        $('#submitComment').css('display', 'none');
//    });
});



