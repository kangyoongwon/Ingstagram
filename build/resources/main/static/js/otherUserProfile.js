$(document).ready(function(){

    // ----------------------------- <상대방 프로필 설정 모달창> ----------------------------
    $('.otherUserSetting').on('click', function(){
        $('.otherUserModal').css('display', 'block');
        $('.userInfoBoxModal').css('display', 'block');
    });
    $('.cancelOtherUserOption').on('click', function(){
        $('.otherUserModal').css('display', 'none');
        $('.userInfoBoxModal').css('display', 'none');
    });
    $('.blockOtherUserOption').on('click', function(){
        $('.askForBlockModal').css('display', 'block');
        $('.otherUserModal').css('display', 'none');
        $('.userInfoBoxModal').css('display', 'block');
    });
    $('.unBlockOtherUserOption').on('click', function(){
        $('.askForBlockModal').css('display', 'block');
        $('.otherUserModal').css('display', 'none');
        $('.userInfoBoxModal').css('display', 'block');
    });
    $('.unBlockedButton').on('click', function(){
        $('.askForBlockModal').css('display', 'block');
        $('.userInfoBoxModal').css('display', 'block');
    });

    // ----------------------------- <차단 질문 모달창> ----------------------------
    $('.blockOtherUser').on('click', function(){
        var newBlockedUser = $(this).attr('username'); //새로 차단될 유저 또는 새로 차단해제될 유저
        console.log('블랙리스트후보: ' + newBlockedUser);
        var $myBlockFlag = $('.myBlockFlag'); //내가 차단했는지 여부
        console.log('차단전이라 false 여야 할 blockFlag:' + $myBlockFlag.val());
        var isBlocked = ($myBlockFlag.val() === '1'); //0이면 false(차단x), 1이면 true(차단)
        var $blockOtherUserDiv = $(this).closest('.blockOtherUser').find('div');
        $.ajax({
            url: isBlocked ? 'unBlockedUsers' : 'blockedUsers', // 차단 상태에 따라 요청 URL 변경
            type: 'POST',
            data: {username: newBlockedUser},
            success: function(data){
                console.log("차단 여부 변경됨: " + !isBlocked);
                $myBlockFlag.val(data); // 차단 상태 업데이트
                console.log("controller로부터 받아온 값: " + data);

                // 차단 Ajax 요청이 성공한 후에 팔로우 상태 업데이트 Ajax 요청 실행
                updateFollowState(newBlockedUser);
                $('.askForBlockModal').css('display', 'none');
                $('.blockAlertModal').css('display','block');
                $('.userInfoBoxModal').css('display', 'block');
            },
            error: function(error) {
                console.error('Error changing your blackList: ', error);
            }
        });
    });

    function updateFollowState(username){
        var $followFlag = $('.followFlag');
        console.log("차단 ajax 보내기 전 follow 상태: " + $followFlag.val());
        $.ajax({ // 차단 또는 차단 해제 성공시 팔로우 상태 업데이트
            url: 'updateFollowState',
            type: 'POST',
            data: {username: username},
            success: function(data){
                console.log("팔로우 여부 false: " + data);
                $followFlag.val(data);
            },
            error: function(error){
                console.error('팔로우 상태 업데이트 도중 에러 발생: ', error);
            }
        });
    }

    $('.cancelOtherUser').on('click', function(){
        $('.askForBlockModal').css('display', 'none');
        $('.userInfoBoxModal').css('display', 'none');
    });

    // ----------------------------- <차단 확답 모달창> ----------------------------

    $('.closeBlockAlert').on('click', function(){
        $('.blockAlertModal').css('display','none');
        $('.userInfoBoxModal').css('display', 'none');
        location.href = './';
    });

    // ----------------------------- <follow 관련 ajax> ----------------------------
//    $follow = $('.followButton');
//    $unFollow = $('.unfollowButton');
//    $requested = $('.followingRequested');
//    $beforeFollowing = $('.beforeFollowing');
//    $waitingForFollowing = $('.waitingForFollowing');
    function follow() {
        const following = $('.con1 span').text();
        $.ajax({
            type:'post',
            url:'../../../../board/followUpdate',
            data:{following:following, flag:0},
            success:function(data) {
                $follow = $('.followButton');
                $beforeFollowing = $('.beforeFollowing');
                if(data=='request') {
                    $follow.removeClass('followButton');
                    $follow.addClass('followingRequested');
                    $follow.text('요청됨');
                    $beforeFollowing.removeClass('beforeFollowing');
                    $beforeFollowing.addClass('waitingForFollow');
                    $beforeFollowing.text('요청됨');
                } else {
                    $follow.removeClass('followButton');
                    $follow.addClass('unfollowButton');
                    $follow.text('팔로잉');
                }
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    }
    function callOffRequest() {
        const following = $('.con1 span').text();
        $.ajax({
            type:'post',
            url:'../../../../board/frDelete',
            data:{following:following},
            success:function(data) {
                $requested = $('.followingRequested');
                $requested.removeClass('followingRequested');
                $requested.addClass('followButton');
                $requested.text('팔로우');
                $waitingForFollow = $('.waitingForFollow');
                $waitingForFollow.removeClass('waitingForFollow');
                $waitingForFollow.addClass('beforeFollowing');
                $waitingForFollow.text('팔로우');
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    }
    $('.con1').on('click', '.followButton', function() {
        follow();
    });
    $('.promid').on('click', '.beforeFollowing', function() {
        follow();
    });
    $('.con1').on('click', '.unfollowButton', function() {
        const following = $('.con1 span').text();
        $.ajax({
            type:'post',
            url:'../../../../board/followUpdate',
            data:{following:following, flag:-1},
            success:function(data) {
                $unfollowButton = $('.unfollowButton');
                $unfollowButton.removeClass('unfollowButton');
                $unfollowButton.addClass('followButton');
                $unfollowButton.text('팔로우');
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
    $('.con1').on('click', '.followingRequested', function() {
        callOffRequest();
    });
    $('.promid').on('click', '.waitingForFollowing', function() {
        callOffRequest();
    });
});
