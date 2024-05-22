function updateRedPoint() {
    $.ajax({
        type:'post',
        url:'../../../../direct/newDMRed',
        success:function(data) {
            $('.newDMRed').remove();
            if(data!==0) {
                const e = '<div class="newDMRed">' + data + '</div>';
                $('#messageButton, #shirinkedMessageButton, #dmMessageButton').prepend(e);
            }
        },
        error:function() {
            alert('오류! 관리자에게 문의');
        }
    });
}
function insertLastMsg(dmid) {
    $.ajax({
        type:'post',
        url:'../../../../direct/lastMessage',
        data:{dmid:dmid},
        success:function(dmRoomDTO) {
            const loggedInUsername = $('#loggedInUsername').text();
            arr = dmRoomDTO['dmContentList'];
            console.log('dmRoomDTO : ', dmRoomDTO);
            console.log('dmContentList : ',arr);
            if(arr.length!=0) {
                const dmContent = arr[arr.length-1];
                console.log(dmContent);
                console.log('loggedInUsername', loggedInUsername);
                if(dmContent['sender']==loggedInUsername) {
                    $('#dmRoomListSection3 button[dmid="' + dmid + '"] .lastMessageContent').text('나: '+dmContent.content);
                } else {
                    $('#dmRoomListSection3 button[dmid="' + dmid + '"] .lastMessageContent').text(dmContent.content);
                }
                $('#dmRoomListSection3 button[dmid="' + dmid + '"] .lastMessageTime').text('· ' + dmRoomDTO.time);
            }
        },
        error:function() {
            alert('오류! 관리자에게 문의');
        }
    });
}
function updateBluePoint(dmid) {
    $.ajax({
        type:'post',
        url:'../../../../direct/newDMBlue',
        data:{dmid:dmid},
        success:function(data) {
            console.log()
            if(!data) {
                if($('#dmRoomListSection3 button[dmid="' + dmid + '"] .bluePoint').length==0) $('#dmRoomListSection3 button[dmid="' + dmid + '"]').append('<div class="bluePoint"></div>');
            } else $('#dmRoomListSection3 button[dmid="' + dmid + '"] .bluePoint').remove();
        },
        error:function() {
            alert('에러! 관리자에게 문의');
        }
    });
}