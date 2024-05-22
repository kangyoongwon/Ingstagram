$(document).ready(function() {
    let slider = '';
    originalUrl = location.href;
    //const originalUrl = 'http://127.0.0.1:8080/explore/';
    function makeBoardModal(boardid, index) {
        if(originalUrl.indexOf('explore/')!=-1) lastIndex = $('#gridContainer button:last').attr('index');
        else {
            if(originalUrl.indexOf('saved')!=-1) lastIndex = $('button[flag="saved"]:last').attr('index');
            else if(originalUrl.indexOf('tagged')!=-1) lastIndex = $('button[flag="tagged"]:last').attr('index');
            else lastIndex = $('button[flag="myPost"]:last').attr('index');
        }
        console.log(lastIndex);
        console.log(index);
        if(index==1) $('#moveToLeft').css('display', 'none');
        else $('#moveToLeft').css('display', 'inline-block');
        if(index==lastIndex) $('#moveToRight').css('display', 'none');
        else $('#moveToRight').css('display', 'inline-block');
        //if(index==finalIndex) $('#moveToRight').css('display', 'none');
        //else $('#moveToRight').css('display', 'inline-block');
        if(index==-10) {
            $('#moveToLeft').css('display', 'none');
            $('#moveToRight').css('display', 'none');
        }
        $.ajax({
            type:'post',
            url:'../../../board/boardModal',
            data:{boardid:boardid},
            success: function(boardViewDTO) {
                const board = boardViewDTO['board'];
                const filesList = boardViewDTO['filesList'];
                const commentDTOList = boardViewDTO['commentDTOList'];
                $('#moveToLeft').attr('index', index/1-1);
                $('#moveToRight').attr('index', index/1+1);
                $('#content1, #content2, #content3, #content4, #content5').attr('class', boardid);
                $('#boardViewModalBody input[name="username"]').val(board['username']);
                $('#boardViewModalBody input[name="boardid"]').val(board['boardid']);
                let e0 = '';
                if(board['parentid']==0) {
                    if(filesList.length>1) {
                        e0 += '<div class="boardModalSlider">';
                        filesList.forEach(function(files) {
                            e0 += '<img src="' + files['path'] + '"></img>';
                        });
                        e0 += '</div>';
                    } else e0 += '<img src="' + filesList[0]['path'] + '"></img>'
                } else {
                    e0 += '<video id="playingVideo" autoplay loop muted>';
                    e0 += '<source src="' + filesList[0]['path'] +'"></video>';
                    e0 += '<button class="muteTrue" id="mute"></button>';
                }
                let e1 = '';
                e1 += '<button class="' + board['username'] + ' profileButton" style="';
                e1 += "background-image:url('" + boardViewDTO['photo'] + "');";
                e1 += '"></button>';
                e1 += '<a href="../../../../' + board['username'] + '/" class="makeUsernameBold">' + board['username'] + '</a>';
                e1 += '<button id="menuButton"></button>';
                let e2 = '';
                e2 += '<div id="mainContent" class="contentGrid">';
                e2 += '<div class="profileArea">';
                e2 += '<button class="' + board['username'] + ' profileButton" style="';
                e2 += "background-image:url('" + boardViewDTO['photo'] + "');";
                e2 += '"></button>';
                e2 += '</div>';
                e2 += '<div class="contentArea"><a href="../../../../' + board['username'] + '/" class="makeUsernameBold">' + board['username'] + '</a> ';
                if(board['content']!=null) e2 += board['content'] + '</div>';
                else e2 += '</div>';
                e2 += '</div>';
                if(commentDTOList.length!=0) {
                    commentDTOList.forEach(function(commentDTO) {
                        const comment = commentDTO['board'];
                        const recommentDTOList = commentDTO['recommentDTOList'];
                        e2 += '<div class="contentGrid" boardid="' + comment['boardid']  + '">';
                        e2 += '<div class="profileArea">';
                        e2 += '<button class="' + comment['username'] + ' profileButton" style="';
                        e2 += "background-image:url('" + commentDTO['photo'] + "');";
                        e2 += '"></button>';
                        e2 += '</div>';
                        e2 += '<div class="contentArea">';
                        e2 += '<a href="../../../../' + comment['username'] + '/" class="makeUsernameBold">' + comment['username'] + '</a> ';
                        e2 += comment['content'];
                        e2 += '<br>';
                        e2 += '<a class="time">' + comment['rdate'] + '  </a>';
                        e2 += '<a boardid="' + comment['boardid']  + '" class="likes">&nbsp;좋아요 ' + commentDTO['heartCount'] + '개&nbsp;</a>';
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
                                e2 += '<a href="../../../../' + recomment['username'] + '/" class="makeUsernameBold">' + recomment['username'] + '</a> ';
                                e2 += recomment['content'];
                                e2 += '<br>';
                                e2 += '<a class="time">' + recomment['rdate'] + '  </a>';
                                e2 += '<a boardid="' + recomment['boardid']  + '" class="likes"&nbsp;좋아요 ' +  recommentDTO['heartCount'] + '개&nbsp;</a>';

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
                    });
                }
                let e3 = '';
                if(boardViewDTO['heartFlag']) e3 += '<button class="heartOn" id="heartButton"></button>';
                else e3 += '<button class="heartOff" id="heartButton"></button>';
                e3 += '<button id="commentButton"></button>';
                e3 += '<button id="directButton"></button>';
                if(boardViewDTO['saveFlag']) e3 += '<button class="saveOn" id="saveButton"></button>';
                else e3 += '<button class="saveOff" id="saveButton"></button>';
                let e4 = '';
                e4 += '<p id="likes"> 좋아요' +  boardViewDTO['heartCount'] + '개</p>';
                e4 += '<p class="time"> ' + board['rdate'] + '</p>';
                let e5 = '';
                e5 += '<textarea placeholder="댓글 달기..." name="structure1" id="writeComment"></textarea>';
                e5 += '<a flag=1 id="submitComment" href="#">게시</a>';
                $('#files').append(e0);
                $('#content1').append(e1);
                $('#content2').append(e2);
                $('#content3').append(e3);
                $('#content4').append(e4);
                $('#content5').append(e5);
                $('#boardViewModalContainer').css('display', 'block');
                $('body').css('overflow', 'hidden');
                slider = $(".boardModalSlider").bxSlider({
                        touchEnabled : (navigator.maxTouchPoints > 0),
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                });
                const newUrl = 'http://192.168.0.48:8080/view/' + boardid + '/';
                history.replaceState({}, '', newUrl);
                $('#writeComment').focus();
            }
        });
    }
    $('#boardViewModalContainer').on('click', function(event) {
        if(event['target']===$(this)['0']) {
            $(this).css('display', 'none');
            $('#files, #content1, #content2, #content3, #content4, #content5').empty();
            $('body').css('overflow', '');
            history.replaceState({}, '', originalUrl);
            slider.destroySlider();
        }
    });

    $('#gridContainer').on('click', 'button', function(event) {
        event.preventDefault();
        const boardid = $(this).attr('id');
        const index = $(this).attr('index');
        makeBoardModal(boardid, index);
    });
    $('.homeCommentButton, .six').on('click', function() {
        event.preventDefault();
        const boardid = $(this).attr('boardid');
        makeBoardModal(boardid, -10);
    });
    $('.myPostButton').on('click', function(event) {
       event.preventDefault();
       const boardid = $(this).attr('id');
       const index = $(this).attr('index');
       console.log("게시물index: " + index);
       makeBoardModal(boardid, index);
    });
    $('.mySavedButton').on('click', function(event) {
       event.preventDefault();
       const boardid = $(this).attr('id');
       const index = $(this).attr('index');
       console.log("게시물index: " + index);
       makeBoardModal(boardid, index);
    });
    $('.myTagButton').on('click', function(event) {
       event.preventDefault();
       const boardid = $(this).attr('id');
       const index = $(this).attr('index');
       console.log("게시물index: " + index);
       makeBoardModal(boardid, index);
    });
    $('#moveToLeft, #moveToRight').on('click', function() {
        const index = $(this).attr('index');
        //const boardid = $('button[index="' + index + '"]').attr('id');
        const boardid = getBoardId(getFlag(),index);
        $('#files, #content1, #content2, #content3, #content4, #content5').empty();
        makeBoardModal(boardid, index);
    });
    function getFlag(){
        const loc = originalUrl;
        const index1 = loc.indexOf("/", 8 );
        const index2 = loc.indexOf("/", index1+1);
        const index3 = loc.indexOf("/", index2+1);
        const flag1 = loc.substring(index1+1, index2);
        const flag2 = loc.substring(index2+1, index3);
        if(flag1 == 'explore') {
            if(flag2=='tags') return flag2;
            else return flag1;
        } else {
            return flag2;
        }
    }
    function getBoardId(flag, index){
        if(flag=="explore") return $('button[flag="explore"][index="'+index+'"]').attr('id');
        else if(flag=='tags') return $('button[flag="tags"][index="'+index+'"]').attr('id');
        else if(flag=="saved") return $('button[flag="saved"][index="'+index+'"]').attr('id');
        else if(flag=="tagged") return $('button[flag="tagged"][index="'+index+'"]').attr('id');
        else return $('button[flag="myPost"][index="'+index+'"]').attr('id');
    }
});
