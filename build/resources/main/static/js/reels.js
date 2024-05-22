// document.addEventListener("DOMContentLoaded", function() {
//     const reelsOpenModalImg = document.getElementById('reelsOpenModalImg');
//     const reelsModal = document.getElementById('reelsMyModal');

//     reelsOpenModalImg.addEventListener('click', function() {
//         showModal(reelsModal);
//     });


//     reelsModal.addEventListener('click', function(event) {
//         closeModalOnBackground(event, reelsModal);
//     });

//     // 휠 움직이면 모달 닫히는
//     // reelsModal.addEventListener('wheel', function(event) {
//     //     closeModal(reelsModal);
//     // });

//     // 모달창 보이기
//     function showModal(modalElement) {
//         modalElement.style.display = 'block';
//     }

//     // 모달창 닫기
//     function closeModal(modalElement) {
//         modalElement.style.display = 'none';
//     }

//     // 배경 클릭 시 모달 닫기
//     function closeModalOnBackground(event, modalElement) {
//         if (event.target === modalElement || event.target === modalElement.querySelector('.reelsModal-content')) {
//             closeModal(modalElement);
//         }
//     }

// });
$(document).ready(function() {
    let scrollIndex = 0;
    let currLoc = 0;
    const handleIntersect = (entries) => {
        entries.forEach((entry) => {
            const video = entry.target;
            if(entry.isIntersecting) {
                video.play();
                const boardid = video.getAttribute('boardid');
                const originalUrl = 'http://192.168.0.48:8080/reels/';
                const newUrl = originalUrl + boardid + '/';
                history.replaceState({}, '', newUrl);
            }
            else video.pause();
        });
    };
    const observerOptions = {
        root:null,
        rootMargin:'0px',
        threshold:1
    };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        observer.observe(video);
    });
    function showNextPage() {
        $.ajax({
            type:'get',
            url:'../../../reels/nextPage',
            success:function(data) {
                data.forEach(function(dto) {
                    const board = dto['board'];
                    const boardid = board['boardid'];
                    let e = '';
                    e += '<div class="videoFeed">';
                    e += '<input type="hidden" name="username" value="' + board['username'] + '">';
                    e += '<input type="hidden" name="boardid" value="' + boardid + '">';
                    e += '<div class="reelsVideo">';
                    e += '<video boardid="' + boardid + '" class="RVideo" preload="auto" controls loop muted>';
                    e += '<source src="' + dto['files']['path'] + '"></video>';
                    e += '<div class="sound">';
                    e += '<button boardid="' + boardid + '" class="vol muteFalse"></button>';
                    e += '</div>';
                    e += '<div class="reelsContent">';
                    e += '<div class="rcon-user">';
                    e += '<button username="' + board['username'] + '" class="userBtn"><img class="rcfeesa" src="' + dto['photo'] + '"><span class="rID">&nbsp;'+board['username']+'</span></button>';
                    e += '<span class="rdot">&nbsp;•&nbsp;</span>';
                    if(dto['followFlag']) e += '<button boardid="' + boardid + '" class="followBtn">언팔로우</button>';
                    else e += '<button boardid="' + boardid + '" class="followBtn">팔로우</button>';
                    e += '</div>';
                    e += '<div class="rcon-detail">';
                    e += '<div class="reelsPost">' + board['content'] + '</div>';
                    e += '</div></div></div>';
                    e += '<div class="reelsMenu">';
                    e += '<div class="reelsMenuAreas">';
                    if(dto['heartFlag']) e += '<button boardid="' + boardid + '" class="heartOn"></button>';
                    else e += '<button boardid="' + boardid + '" class="heartOff"></button>';
                    e += '<div boardid="' + boardid + '" class="Rsp1">' + dto['heartCount'] + '</div>';
                    e += '</div>';
                    e += '<div class="reelsMenuAreas">';
                    e += '<button boardid="' + boardid + '" class="reelsCommentButton"></button>'
                    e += '<div class="Rsp2">' + dto['commentCount'] + '</div>';
                    e += '</div>';
                    e += '<div class="reelsMenuAreas">';
                    e += '<button class="reelsDMButton"></button>';
                    e += '</div>';
                    e += '<div class="reelsMenuAreas">';
                    if(dto['saveFlag']) e += '<button boardid="' + boardid + '" class="saveOn"></button>';
                    else e += '<button boardid="' + boardid + '" class="saveOff"></button>';
                    e += '</div>';
                    e += '<div class="reelsMenuAreas">';
                    e += '<button boardid="' + boardid + '" class="reelsMoreButton"></button>';
                    e += '</div></div></div></div></div>';
                    $('.main').append(e);
                    const videos = document.querySelectorAll('video');
                    videos.forEach((video) => {
                        observer.observe(video);
                    });
                    $(window).off('scroll');
                    $(window).scrollTop(currLoc);
                });
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    }
    function scrollInit() {
        $('#reelsCommentModalContainer').css('display', 'none');
        $('#shareModalContainer').css('display',  'none');
        $('#reelsMenuModalContainer').css('display', 'none');
        $('#shareModalSearch input').val('');
        $('#foundTargetWrapper').empty();
        $('#searchModalResult').empty();
        $('#sendShareButton').attr('disabled', true);
        $('#writeComment').val('');
        $('#writeComment').attr('name', 'structure1');
    }
    function moveScroll(scrollIndex) {
        $('#reelsCommentModalContainer').css('display', 'none');
        $('#shareModalContainer').css('display', 'none');
        $('#reelsMenuModalContainer').css('display', 'none');
        $(window).off('scroll');
        const newLoc = $(window).scrollTop();
        if(newLoc>currLoc) scrollIndex++;
        else if(newLoc<currLoc) scrollIndex--;
        const moveToLoc = 780*scrollIndex + 10*(2*scrollIndex-1);
        $('html, body').animate({scrollTop:moveToLoc}, 600);
        currLoc = moveToLoc;
        let loc = $(window).scrollTop();
        let height1 = $(window).height();
        let height2 = $(document).height();
        if(height2-(currLoc+height1)<=0) {
            showNextPage();
        }
        setTimeout(function() {
            $(window).on('scroll', function() {
                moveScroll(scrollIndex);
            });
        }, 700);
    }
    function calculate(scrollIndex) {
        return 10*scrollIndex*(2*scrollIndex+77);
    }
    $(window).on('scroll', function() {
        moveScroll(scrollIndex);       
    });
    $('.main').on('click', '.userBtn',function() {
        location.href ='../../../../' + $(this).attr('username') + '/';
    });
    $('.main').on('click', '.followBtn', function() {
        const boardid = $(this).attr('boardid');
        const username = $(this).closest('.videoFeed').find('input[name="username"]').val();
        let flag = -2;
        if($(this).text()==='팔로우') {
            $(this).text('언팔로우');
            flag = -1;
        } else {
            $(this).text('팔로우');
            flag = 0;
        }
        $.ajax({
            type:'post',
            url:'../../../board/followUpdate',
            data:{following:username, flag:flag},
            success:function() {},
            error:function() {
                alert("오류! 관리자에게 문의");
            }
        });
    });
    $('.main').on('click', '.heartOn, .heartOff', function() {
        const boardid = $(this).attr('boardid');
        let flag = -2;
        if($(this).attr('class')=='heartOn') {
            removeAndAdd($(this), 'heartOn', 'heartOff');
            flag = -1;
        } else {
            removeAndAdd($(this), 'heartOff', 'heartOn');
            flag = 0;
        }
        $.ajax({
            type:'post',
            url:'../../../board/stringHeartUpdate',
            data:{boardid:boardid, flag:flag},
            success: function(data) {
                $('.Rsp1[boardid="'+boardid+'"]').text(data);
            },
            error: function() {
                alert("오류! 관리자에게 문의");
            }
        });
    });
    $('.main').on('click', '.saveOn, .saveOff', function() {
        const boardid = $(this).attr('boardid');
        let flag = -2;
        if($(this).attr('class')=='saveOn') {
            removeAndAdd($(this), 'saveOn', 'saveOff');
            flag = -1;
        } else {
            removeAndAdd($(this), 'saveOff', 'saveOn');
            flag = 0;
        }
        $.ajax({
            type:'post',
            url:'../../../board/saveUpdate',
            data:{boardid:boardid, flag:flag},
            success:function(data) {
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
    $('.main').on('click', '.vol', function() {
        const classes = $(this).attr('class');
        const boardid = $(this).attr('boardid');
        if(classes.substring(classes.indexOf(' ')+1)=='muteFalse') {
            removeAndAdd($('.vol'), 'muteFalse', 'muteTrue');
            $('video').prop('muted', false);
        } else {
            removeAndAdd($('.vol'), 'muteTrue', 'muteFalse');
            $('video').prop('muted', true);
        }
    });
    $('#reelsMenuModalContainer').on('click', function(event) {
        if(event['target']===$(this)['0']) $(this).css('display', 'none');
    })
    $('.main').on('click', '.reelsMoreButton', function() {
        const boardid = $(this).attr('boardid');
        const username = $(this).closest('.videoFeed').find('input[name="username"]').val();
        const text = $('.followBtn[boardid="'+boardid+'"]').text();
        $("#reelsMenuModalContainer input[name='boardid']").val(boardid);
        $("#reelsMenuModalContainer input[name='username']").val(username);
        if(text=='언팔로우') {
            $('#followOrNot').text('팔로우 취소');
            removeAndAdd($('#followOrNot'), 'blueFont', 'redFont');
        } else {
            $('#followOrNot').text('팔로우');
            removeAndAdd($('#followOrNot'), 'redFont', 'blueFont');
        }
        $('#reelsMenuModalContainer').css('display', 'block');
    });
    $('#followOrNot').on('click', function(event) {
        const boardid = $("#reelsMenuModalContainer input[name='boardid']").val();
        const username = $("#reelsMenuModalContainer input[name='username']").val();
        let flag = -2;
        if($('#followOrNot').text()=='팔로우 취소') flag = -1;
        else flag = 0;
        $.ajax({
            type:'post',
            url:'../../../board/followUpdate',
            data:{following:username, flag:flag},
            success:function() {
                $('#reelsMenuModalContainer').css('display', 'none');
                if(flag==-1) $('.followBtn[boardid="'+boardid+'"]').text('팔로우');
                else $('.followBtn[boardid="'+boardid+'"]').text('언팔로우');
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
    $('.copyLink').on('click', function() {
        let currLoc = location.href;
        navigator.clipboard.writeText(currLoc);
        $('#reelsMenuModalContainer').css('display', 'none');
    });
});
