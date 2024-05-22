$(document).ready(function(){
    $(".slider").bxSlider({
        slideWidth: 450, // 각 슬라이드의 너비 설정
        minSlides: 1, // 최소로 보여질 슬라이드 개수
        slideMargin: 10, // 슬라이드 사이의 간격
        infiniteLoop: false,
        hideControlOnEnd: true,
        adaptiveHeight: true
    });

    //좋아요 버튼 클릭 시
    $('.heartTrue,.heartFalse').on('click', function(){
        var $button = $(this); // 현재 버튼 요소를 $button 변수에 저장
        // 게시물의 postId와 현재 사용자의 username을 가져옴.
        var postId = $button.closest('.view').find('.postId').val();
        console.log("postId: " + postId);
        //var username = $button.closest('.view').find('.prof a').attr('href').substring(3); //<a href="../${post.username}/">${post.username}</a> 주소값뒤에 /안붙인 경우
        var username = $button.closest('.view').find('.prof a').attr('href').split('/')[1];
        console.log("username: " + username);
        var heartFlag = $button.closest('.three').find('.left button').hasClass('heartTrue') ? 1 : 0;  //하트 상태를 나타내는 값
        console.log("heartFlag: " + heartFlag);
        var heartCount = $button.closest('.view').find('.four .font').text();
        console.log("heartCount: " + heartCount);
        if(heartFlag==1) heartFlag = -1;
        else heartFlag = 0;
        //AJAX를 이용해서 post.heartFlag 값을 변경하고 서버에 데이터 전송
        $.ajax({
            url: 'home', //서버에 데이터를 전송할 URL
            method: 'POST', //전송 방식
            data: {
                postId: postId, //게시물의 id
                username: username, //현재 유저네임
                heartFlag: heartFlag, //하트여부
                action: 'like'
            },
            success: function(response){

                if (response.heartSuccess){
                    // 하트 아이콘 이미지를 변경
                    if(heartFlag == 0){
                        $button.find('img').attr('src', '/imgs/fullht.png');
                        $button.removeClass('heartFalse').addClass('heartTrue');

                    }else{
                         $button.find('img').attr('src', '/imgs/ht.png');
                         $button.removeClass('heartTrue').addClass('heartFalse');
                    }
                    // 하트 수 업데이트
                    var updatedHeartCount = response.heartCount;
                    $button.closest('.view').find('.four .font').text('좋아요 ' + updatedHeartCount + '개');

                    // boardModal2 내부의 하트 아이콘 및 좋아요 수 업데이트
                    $('#heartButton').removeClass('heartOff heartOn').addClass(response.heartFlag ? 'heartOn' : 'heartOff');
                    $('#likes').text('좋아요 ' + updatedHeartCount + '개');

                }else{
                    alert('서버 오류: ' + response.heartMessage);
                }
            }
        });
    });

    //저장 버튼 클릭 시
    $('.savedTrue,.savedFalse').on('click', function(){
        var $button = $(this);
        var postId = $button.closest('.view').find('.postId').val();
        console.log("postId: " + postId);
        //var username = $button.closest('.view').find('.prof a').attr('href').substring(3);
        var username = $button.closest('.view').find('.prof a').attr('href').split('/')[1];
        console.log("username: " + username);
        var saveFlag = $button.closest('.three').find('.right button').hasClass('savedTrue') ? 1 : 0;  //저장 상태를 나타내는 값
        console.log("saveFlag ajax보내기전: " + saveFlag);

        //AJAX를 이용해서 post.saveFlag 값을 변경하고 서버에 데이터 전송
        $.ajax({
            url: 'home',
            method: 'POST',
            data: {
                postId: postId, //게시물의 id
                username: username, //현재 유저네임
                saveFlag: saveFlag, //저장여부
                action: 'save'
            },
            success: function(response){

                if (response.saveSuccess){
                    if(saveFlag == 0){
                        $button.find('img').attr('src', '/imgs/fullKeep.png');
                        $button.removeClass('savedFalse').addClass('savedTrue');
                        // boardModal2에 있는 saveFlag값 업데이트
                        $('#content3 #saveButton').removeClass('saveOff').addClass('saveOn');
                    }else{
                        $button.find('img').attr('src', '/imgs/keep.png');
                        $button.removeClass('savedTrue').addClass('savedFalse');
                        // boardModal2에 있는 saveFlag값 업데이트
                        $('#content3 #saveButton').removeClass('saveOn').addClass('saveOff');
                    }
                }else{
                    //처리 중 오류가 발생한 경우
                    alert('서버 오류: ' + response.saveMessage);
                }
            }
        });
    });

    //댓글 게시 버튼 클릭 시
    $('.main_feed').on('click', '.btn-chat', function(event) {
        const $button = $(this);
        const boardid = $button.closest('.view').find('.postId').val();
        //const username = $button.closest('.view').find('.prof a').attr('href').substring(3);
        var username = $button.closest('.view').find('.prof a').attr('href').split('/')[1];
        const content = trimData($('.input-chat[boardid="'+boardid+'"]').val());

        $.ajax({
            type:'post',
            url:'../../board/commentInsert',
            data:{content:content, structure:1, parentid:boardid, username:username},
            success:function() {
                $('.input-chat[boardid="'+boardid+'"]').val('');
                const $commentWrapper = $('.box-comment[boardid="'+boardid+'"]');
                console.log($commentWrapper);
                const children = $commentWrapper.children();
                console.log(children);
                if(children.length>=3) children['0'].remove();
                let e = '<div><a href="../' + username + '">' + username + '</a>&nbsp;<span class="text-comment">' + content + '</span><button class="commentHeartFalse"></button></div>';
                $commentWrapper.append(e);
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
        //'<a href="../'+ board.username+'"></a>&nbsp;<p class="text-comment">'+ board.content+'</p>'+'<button class = "commentHeartFalse" src="/imgs/ht.png" width="14" height="14" alt="하트 아이콘"></button><br>';
    });

    // 입력한 댓글이 없을 때 게시 버튼 비활성화
    $('.input-chat').on('input', function() {
        var commentContent = $(this).val();
        var $parentBox = $(this).parent(); //공통 부모 요소 선택
        var $btnChat = $parentBox.find('.btn-chat'); //공통 부모 요소 아래에 있는 버튼 선택
        if (trimData(commentContent).length > 0) {
            //$(this).closest('.box-chat').find('.btn-chat').prop('disabled', false);
            $btnChat.prop('disabled', false); // 댓글 내용이 있는 경우 게시 버튼 활성화
            $btnChat.addClass("btn-chat-effect"); // 활성화 효과 적용
        } else {
            //$(this).closest('.box-chat').find('.btn-chat').prop('disabled', true);
            $btnChat.prop('disabled', true); // 댓글 내용이 없는 경우 게시 버튼 비활성화
            $btnChat.removeClass("btn-chat-effect"); // 비활성화 효과 제거
        }
    });
    $('.input-chat').on("keyup", function(e) {
        if (e.key == "Enter") {
            e.preventDefault();
        }
    });

    $('.three button').each(function(){
        var $button = $(this);
        var $textBox = $button.find('.iconTextBox');
        var $cancelTextBox = $button.find('.iconCancelTextBox');
        var timer;

        $button.on('click mouseenter', function(event){ // 클릭 및 mouseenter 이벤트 사용
            clearTimeout(timer); // 클릭 시 타이머 취소

            if(event.type === 'click') {
                if ($button.hasClass('heartTrue') || $button.hasClass('savedTrue')) {
                    $cancelTextBox.css('display', 'block');
                    $textBox.css('display', 'none');
                } else {
                    $textBox.css('display', 'none');
                    $cancelTextBox.css('display', 'block');
                }
            } else if (event.type === 'mouseenter'){
                if(!($button.hasClass('heartTrue') || $button.hasClass('savedTrue'))) {
                   timer = setTimeout(function(){
                        $textBox.css('display', 'block');
                    }, 2000);
                }else { // 좋아요 또는 저장 상태인 경우
                  timer = setTimeout(function(){
                     $cancelTextBox.css('display', 'block');
                  }, 2000);
                }
            }
        }).mouseleave(function(){
            clearTimeout(timer);
            $textBox.css('display', 'none');
            $cancelTextBox.css('display', 'none');
        });
    });
/*
  //댓글 게시 버튼 클릭 시
  $('.btn-chat').on('click', function(){
    var $button = $(this);
    //게시물의 postId와 현재 사용자의 username을 가져옴.
    var postId = $button.closest('.view').find('.postId').val();
    var username = $button.closest('.view').find('.prof a').attr('href').substring(3);
    var commentInput = $button.closest('.box-chat').find('.input-chat'); //댓글 입력란 가져오기
    var commentContent = commentInput.val(); //입력된 댓글 내용 가져오기
    var commentBox = $button.closest('.box-comment');

    //AJAX를 이용해서 댓글 내용을 서버에 전송
    $.ajax({
      url: 'comment', //서버에 데이터를 전송할 URL
      method: 'POST', //전송 방식
      data: {
          parentid: postId, //게시물의 id
          username: username, //현재 유저네임
          content: commentContent //댓글내용
      },
           success: function(response){
               //서버로부터 응답을 받았을 때 수행할 작업
               console.log(response); //서버로부터 받은 응답 로그 출력

               var board = response.board;
               var newComment = createCommentElement(board.username, board.content);
               //'<a href="../'+ board.username+'"></a>&nbsp;<p class="text-comment">'+ board.content+'</p>'+'<button class = "commentHeartFalse" src="/imgs/ht.png" width="14" height="14" alt="하트 아이콘"></button><br>';
               commentBox.prepend(newComment);

               //최신 댓글 3개만 보여주기
               var commentElements  = commentBox.children();
               if(commentElements.length > 3){
                  commentElements.slice(3).remove();
               }
           },
           error: function(xhr, status, error){
               //서버와의 통신 중 오류가 발생했을 때 수행할 작업
               console.error(error); //오류 로그 출력
               alert('서버와의 통신 중 오류가 발생했습니다.');
           }
    });

    //댓글 추가 함수
    addComment(commentContent, username, commentBox);

    //댓글 입력란의 입력을 감지하여 게시 버튼 활성화/비활성화
    if(trimData(commentInput.val()).length > 0){
         $button.prop('disabled', false).addClass("btn-chat-effect");
    } else {
         $button.prop('disabled', true).removeClass("btn-chat-effect");
    }
       // 댓글 카운트 업데이트
       //updateCommentCount();
  });

  // 입력한 댓글이 없을 때 게시 버튼 비활성화
  $('.input-chat').on('input', function() {
     var commentContent = $(this).val();
     var $parentBox = $(this).parent(); //공통 부모 요소 선택
     var $btnChat = $parentBox.find('.btn-chat'); //공통 부모 요소 아래에 있는 버튼 선택
     if(trimData(commentContent).length > 0) {
                //$(this).closest('.box-chat').find('.btn-chat').prop('disabled', false);
     $btnChat.prop('disabled', false); // 댓글 내용이 있는 경우 게시 버튼 활성화
     $btnChat.addClass("btn-chat-effect"); // 활성화 효과 적용
     } else {
        //$(this).closest('.box-chat').find('.btn-chat').prop('disabled', true);
        $btnChat.prop('disabled', true); // 댓글 내용이 없는 경우 게시 버튼 비활성화
        $btnChat.removeClass("btn-chat-effect"); // 비활성화 효과 제거
     }
  });

  $('.input-chat').on("keyup",function(e){
     if(e.key == "Enter"){ //Enterkey로 댓글게시가능
        e.preventDefault();
     }
  });
  //댓글 쓰기 함수
  function addComment(commentContent, username, commentBox){
        var commentElement = createCommentElement(username, commentContent); // 새로운 댓글 요소 생성
        commentBox.prepend(commentElement);
  }

  //댓글 요소 생성 함수
  function createCommentElement(username, commentContent){
        var commentText = $('<p class="text-comment"></p>').text(commentContent); // 댓글 텍스트 생성
        var likeButton = $('<button class="commentHeartFalse""></button>'); // 좋아요 버튼 생성
        //<button class="heartTrue"><img src="/imgs/fullht.png" alt="좋아요 아이콘"></button>
        likeButton.click(function() { // 좋아요 버튼 클릭 이벤트 처리
                if($(this).hasClass("liked")) {
                    $(this).removeClass("liked");
                    $(this).css('background-image', 'url("/imgs/ht.png")'); // 하트 아이콘 변경
                } else {
                    $(this).addClass("liked");
                    $(this).css('background-image', 'url("/imgs/fullht.png")'); // 하트 아이콘 변경
                }
        });
        var commentElement = $('<div></div>').append('<a href="../'+ username +'"></a>&nbsp;').append(commentText).append(likeButton).append('<br>'); // 댓글 요소 생성
        return commentElement;
  }
*/
});

document.addEventListener("DOMContentLoaded", function() {

//홈화면(피드화면)
//피드 게시물에 작성된 글의 더보기 펼치는 기능
//모든 토글 버튼 선택
    const toggleButtons = document.querySelectorAll('.toggleButton');
//각 토글 버튼에 대한 클릭 이벤트 핸들러 추가
    toggleButtons.forEach(function(button){
        button.addEventListener('click', function(){
        console.log('버튼 클릭됨');
            const post = button.closest('.post'); //클릭된 버튼의 부모 요소 게시물(.post) 선택
            const summary = post.querySelector('.summary'); //요약된 내용 요소 선택
            const fullContent = post.querySelector('.fullContent'); //전체 내용 요소 선택

            if (fullContent.style.display === 'none') {
            summary.style.display = 'none';
            fullContent.style.display = 'block';
            button.textContent = '접기';
            } else {
            fullContent.style.display = 'none';
            summary.style.display = 'block';
            button.textContent = '더 보기';
            }
        });
    });
});