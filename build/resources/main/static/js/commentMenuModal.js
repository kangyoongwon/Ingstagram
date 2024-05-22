$(document).ready(function() {
   $('#commentMenuModalContainer').on('click', function(event) {
        if(event['target']===$(this)['0']) {
            $(this).css('display', 'none');
        }
   });
   $('#content2').on('click', '.commentMenuButton', function(event) {
       event.preventDefault();
       const username = $(this).attr('username');
       const boardid = $(this).attr('boardid');
       $('#reportOrDelete').attr('boardid', boardid);
       $.ajax({
           type:'post',
           url:'../../../../board/mineOrNot',
           data:{username:username},
           success:function(data) {
               if(data) $('#reportOrDelete').text('삭제');
               else $('#reportOrDelete').text('신고');
           },
           error:function() {
               alert('오류! 관리자에게 문의');
           }
       });
       $('#commentMenuModalContainer').css('display', 'block');
   });
   $('#reportOrDelete').on('click', function() {
        const boardid = $('#reportOrDelete').attr('boardid');

        if($('#reportOrDelete').text()=='삭제')
            $.ajax({
                type:'post',
                url:'../../../board/commentDelete',
                data:{boardid:boardid},
                success:function(board){
                    if(board['structure']==1) {
                        console.log(board);
                        console.log($('.contentGrid[boardid="' + board['boardid'] + '"]').length);
                        $('.contentGrid[boardid="' + board['boardid'] + '"]').remove();
                    } else {
                        $('.reply[boardid="' + board['boardid'] + '"]').remove();
                    }
                },
                error:function() {
                    alert('오류! 관리자에게 문의');
                }
            });
        else {} //신고는 없음
        $('#commentMenuModalContainer').css('display', 'none');
   });
   $('#closeCommentMenuModal').on('click', function() {
           $('#commentMenuModalContainer').css('display', 'none');
   });
});