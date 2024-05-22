$(document).ready(function() {
    function initShareModal() {
        $('#shareModalContainer').css('display',  'none');
        $('#shareModalSearch input').val('');
        $('#foundTargetWrapper').empty();
        $('#searchModalResult').empty();
        $('#sendShareButton').attr('disabled', true);
    }
    $('#shareModalContainer').on('click', function() {
        if(event['target']===$(this)['0']) {
            $(this).css('display', 'none');
            initShareModal();
        }
    });
    $('#closeShareModal').on('click', function() {
        $('#shareModalContainer').css('display', 'none')
        initShareModal();
    });
    $('.main').on('click', '.reelsDMButton', function() {
        $('#shareModalContainer').css('display', 'block');
    });
    $('#content3').on('click', '#directButton', function() {
        $('#shareModalContainer').css('display', 'block');
    });
    $('#homeDMButton').on('click', function() {
        const boardid = $(this).closest('.view').find('.postId').val();
        $('#shareModalContainer input[name="boardid"]').val(boardid);
        $('#shareModalContainer').css('display', 'block');
    });
    $('input[name="searchShareTarget"]').on('keyup', function() {
        const data = trimData($(this).val());
        if(data.length==0) {
            $('#ndmrmResult').empty();
            return false;
        }
        $.ajax({
            type:'post',
            url:'../../../direct/searchReceiver',
            data:{data:data},
            success:function(arr) {
                $('#shareModalResult').empty();
                arr.forEach(function(member) {
                    let e = '';
                    e += '<button name="' + member['name'] + '" username="' + member['username'] + '" class="shareResultGrid">';
                    e += '<img src="' + member['photo'] + '">';
                    e += '<div class="shareResultInfo">';
                    e += '<div>' + member['name'] + '</div>';
                    e += '<div>' + member['username'] + '</div>';
                    e += '</div></button>';
                    $('#shareModalResult').append(e);
                });
            },
            error:function() {
                alert("오류! 관리자에게 문의");
            }
        });
    });
    $('#shareModalResult').on('click', 'button', function() {
        const name = $(this).attr('name');
        const username = $(this).attr('username');
        let e = '<button username="' + username + '" class="foundTargetButton">' + name + '</button>';
        $('#foundTargetWrapper').append(e);
        $('#shareModalResult').empty();
        $('input[name="searchShareTarget"]').val('');
        if($('#foundTargetWrapper').children().length>0) {
            $('#sendShareButton').removeAttr('disabled');
            $('#sendShareButton').css('background-color', 'rgb(53, 174, 255)')
        }
    });
    $('#foundTargetWrapper').on('click', 'button', function() {
        $(this).remove();
        if($('#foundTargetWrapper').children().length<=0) {
            $('#sendShareButton').attr('disabled', true);
            $('#sendShareButton').css('background-color', 'rgb(224, 224, 224)')
        }
    });
});