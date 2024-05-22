
$(document).ready(function() {
    const photo = $('#loggedInPhoto').text();
    $('#reelsCommentModalContainer').on('click', function(event) {
        if(event['target']==$(this)['0']) $(this).css('display', 'none');
    });
    $('.main').on('click', '.reelsCommentButton', function() {
        $('#content2').empty();
        $('#writeComment').val('');
        const boardid = $(this).attr('boardid');
        $('#content2, #content5').attr('class', boardid);
        $.ajax({
            type:'post',
            url:'../../../board/comments',
            data:{boardid:boardid},
            success:function(commentDTOList) {
                if(commentDTOList.length!=0) {
                    commentDTOList.forEach(function(commentDTO) {
                        let e2 = '';
                        const comment = commentDTO['board'];
                        const recommentDTOList = commentDTO['recommentDTOList'];
                        e2 += '<div class="contentGrid" boardid="' + comment['boardid']  + '">';
                        e2 += '<div class="profileArea">';
                        e2 += '<button class="' + comment['username'] + ' profileButton" style="';
                        e2 += "background-image:url('" + commentDTO['photo'] + "');";
                        e2 += '"></button>';
                        e2 += '</div>';
                        e2 += '<div class="contentArea">';
                        e2 += '<a href="#">' + comment['username'] + '</a> ';
                        e2 += '<a class="time">' + comment['rdate'] + '  </a>';
                        e2 += '<br>';
                        e2 += comment['content'];
                        e2 += '<br>';
                        e2 += '<a boardid="' + comment['boardid'] + '" class="likes">&nbsp;좋아요 ' + commentDTO['heartCount'] + '개&nbsp;</a>';
                        e2 += '<a href="#" class="' + comment['username'] + ' ' + comment['boardid'] + ' writeReply">  답글 달기</a>';

                        e2 += '<button boardid="' + comment['boardid'] + '" username="' + comment['username'] + '" class="commentMenuButton"></button>';

                        if(recommentDTOList.length!=0) {
                            e2 += '<br><a href="#" class="' + comment['boardid'] + ' openReply">------ 답글 보기(' + recommentDTOList.length + '개)</a>';
                            e2 += '<a href="#" class="' + comment['boardid'] + ' closeReply">------ 답글 숨기기</a>';
                        }
                        e2 += '</div>';
                        e2 += '<div class="heartArea">';
                        if(commentDTO['heartFlag']) e2 += '<button class="' + comment['boardid'] + ' heartButton heartOn"></button>';
                        else e2 += '<button class="' + comment['boardid'] + ' heartButton heartOff"></button>';
                        e2 += '</div>';
                        if(recommentDTOList.length!=0) {
                            e2 += '<div class="' + comment['boardid'] + ' replyContainer">';
                            recommentDTOList.forEach(function(recommentDTO) {
                                const recomment = recommentDTO['board'];
                                e2 += '<div boardid="' + recomment['boardid'] + '" class="reply">';
                                e2 += '<div class="profileArea">';
                                e2 += '<button class="' + recomment['username'] + ' profileButton" style="';
                                e2 += "background-image:url('" + recommentDTO['photo'] + "');";
                                e2 += '"></button>';
                                e2 += '</div>';
                                e2 += '<div class="reContent">';
                                e2 += '<a href="#">' + recomment['username'] + '</a> ';
                                e2 += '<a class="time">' + recomment['rdate'] + '</a>';
                                e2 += '<br>';
                                e2 += recomment['content'];
                                e2 += '<br>';

                                e2 += '<a boardid="' + recomment['boardid'] + '" class="likes">&nbsp;좋아요 ' +  recommentDTO['heartCount'] + '개&nbsp;</a>';

                                e2 += '<button boardid="' + comment['boardid'] + '" username="' + comment['username'] + '" class="commentMenuButton"></button>';

                                e2 += '</div>';
                                e2 += '<div class="heartArea">';
                                if(recommentDTO['heartFlag']) e2 += '<button class="' + recomment['boardid'] + ' heartButton heartOn"></button>';
                                else e2 += '<button class="' + recomment['boardid'] + ' heartButton heartOff"></button>';
                                e2 += '</div>';
                                e2 += '</div>';
                            });
                            e2 += '</div>'
                        }
                        e2 += '</div>';
                        $('#content2').append(e2);
                        $('#writeComment').focus();
                    });
                }
            },
            error:function() {
            }
        });
        $('#reelsCommentModalContainer').css('display', 'block');
    });
    $('#closeReelsCommentModal').on('click', function() {
        $('#reelsCommentModalContainer').css('display', 'none');
    });
});



