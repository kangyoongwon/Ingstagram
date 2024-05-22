$(document).ready(function() {
    $('#newDMRoomModalContainer').on('click', function(event) {
        if(event['target']===$(this)['0'])
            $(this).css('display', 'none');
        $('input[name="searchNewCounterpart"]').val('');
    });
    $('#closeNewDMRoomModal').on('click', function() {
        $('#newDMRoomModalContainer').css('display', 'none');
        $('input[name="searchNewCounterpart"]').val('');
    });
    $('#makeNewDMRoomBtn1, #makeNewDMRoomBtn2').on('click', function() {
        $('#newDMRoomModalContainer').css('display', 'block');
    });
    $('#ndmrmResult').on('click', 'button', function() {
        const name = $(this).attr('name');
        const username = $(this).attr('username');
        let e = '<button username="' + username + '" class="foundCounterpartBtn">' + name + '</button>';
        $('#ndmrmReceiver').append(e);
        $('#ndmrmResult').empty();
        if($('#ndmrmReceiver').children().length>0) {
            $('#makeNewDMRoomBtn').removeAttr('disabled');
            $('#makeNewDMRoomBtn').css('background-color', 'rgb(53, 174, 255)')
        }
    });
    $('#ndmrmReceiver').on('click', 'button', function() {
        $(this).remove();
        if($('#ndmrmReceiver').children().length<=0) {
            $('#makeNewDMRoomBtn').attr('disabled', true);
            $('#makeNewDMRoomBtn').css('background-color', 'rgb(224, 224, 224)')
        }
    });
    $('input[name="searchNewCounterpart"]').on('keyup', function() {
        const data = $(this).val();
        if(data.length==0) {
            $('#ndmrmResult').empty();
            return false;
        }
        $.ajax({
            type:'post',
            url:'../../../../direct/searchReceiver',
            data:{data:data},
            success:function(arr) {
                //프로필 사진, 이름, username
                $('#ndmrmResult').empty();
                arr.forEach(function(member) {
                    let e = '';
                    e += '<button name="' + member['name'] + '" username="' + member['username'] + '" class="ndmrmResultGrid">';
                    e += '<img src="' + member['photo'] + '">';
                    e += '<div class="ndmrmResultInfo">';
                    e += '<div>' + member['name'] + '</div>';
                    e += '<div>' + member['username'] + '</div>';
                    e += '</div></button>';
                    $('#ndmrmResult').append(e);
                });
            },
            error:function() {
                alert('에러! 관리자에게 문의');
            }
        });
    });
    $('#makeNewDMRoomBtn').on('click', function() {
        const obj = $('#ndmrmReceiver').children();
        let usernameArr = [];
        obj.each(function() {
            usernameArr.push($(this).attr('username'));
        });
        $.ajax({
            type:'post',
            url:'../createDMRoom',
            data:{receiver:usernameArr[0]},
            success:function(dmid) {
                location.href="../../../../direct/t/" + dmid + '/';
            },
            error:function() {
                alert('에러! 관리자에게 문의');
            }
        });
    });
});