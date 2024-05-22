//function updateRedPoint() {
//    $.ajax({
//        type:'post',
//        url:'../../../direct/newDMRed',
//        success:function(data) {
//            if(data!==0) {
//                $('.newDMRed').remove();
//                const e = '<div class="newDMRed">' + data + '</div>';
//                $('#messageButton, #shirinkedMessageButton, #dmMessageButton').prepend(e);
//            }
//        },
//        error:function() {
//            alert('오류! 관리자에게 문의');
//        }
//    });
//}
$(document).ready(function() {
//    setInterval(updateRedPoint, 1000);
    $('#homeButton, #shirinkedHomeButton, #dmHomeButton, #shirinkedLogo, #dmLogo').on('click', function() {
        location.href = '../../../../home/';
    });
    $('#exploreButton, #shirinkedExploreButton, #dmExploreButton').on('click', function() {
        location.href = '../../../../explore/';
    });
    $('#reelsButton, #shirinkedReelsButton, #dmReelsButton').on('click', function() {
        location.href = '../../../../reels/';
    });
    $('#messageButton, #shirinkedMessageButton, #dmMessageButton').on('click', function() {
        location.href = '../../../../direct/inbox/'
    });
    $('#profileButton, #shirinkedProfileButton, #dmProfileButton').on('click', function() {
        location.href = '../../../../' + $('#loggedInUsername').text() + '/';
    });












});














