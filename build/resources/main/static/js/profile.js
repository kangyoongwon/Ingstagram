$(document).ready(function(){
    finalIndex = $('.finalIndex').val();
    var loggedInUsername = $('#loggedInUsername').text();

    function updateURL(tab){
        var url = `/${loggedInUsername}/`;
         if (tab === 'saved') {
                    url += 'saved';
         } else if (tab === 'tagged') {
                    url += 'tagged';
         }
         history.pushState(null, null, url);
    }
    // 게시물 아이콘 클릭 시
    $('.postsbutton').click(function() {
    console.log("게시물아이콘클릭됨");
        $('#posts-content').addClass('active');
        $('#saved-content').removeClass('active');
        $('#tagged-content').removeClass('active');

    // 버튼 이미지 변경
        $(".postsbutton img").attr("src", "/imgs/procontentC.PNG");
        $(".savedbutton img").attr("src", "/imgs/prokeep.PNG");
        $(".taggedbutton img").attr("src", "/imgs/protag.PNG");

        finalIndex = $('.finalIndex').val();
        // URL 변경
        updateURL('');
    });

    // 저장됨 아이콘 클릭 시
    $('.savedbutton').click(function() {
     console.log("저장됨아이콘클릭됨");
        $('#posts-content').removeClass('active');
        $('#saved-content').addClass('active');
        $('#tagged-content').removeClass('active');

    // 버튼 이미지 변경
        $(".postsbutton img").attr("src", "/imgs/procontent.PNG");
        $(".savedbutton img").attr("src", "/imgs/prokeepC.PNG");
        $(".taggedbutton img").attr("src", "/imgs/protag.PNG");

        finalIndex = $('.maxIndex').val();
        // URL 변경
        updateURL('saved');
    });

    // 태그됨 아이콘 클릭 시
    $('.taggedbutton').click(function() {
     console.log("태그됨아이콘클릭됨");
        $('#posts-content').removeClass('active');
        $('#saved-content').removeClass('active');
        $('#tagged-content').addClass('active');

    // 버튼 이미지 변경
        $(".postsbutton img").attr("src", "/imgs/procontent.PNG");
        $(".savedbutton img").attr("src", "/imgs/prokeep.PNG");
        $(".taggedbutton img").attr("src", "/imgs/protagC.PNG");

        finalIndex = $('.endIndex').val();
        // URL 변경
        updateURL('tagged');
    });
});
