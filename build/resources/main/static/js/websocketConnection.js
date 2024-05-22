$(document).ready(function() {
    let reconnect = 0;
    let exist = -1;
    const loggedInUsername = $('#loggedInUsername').text();
    function connect(ws, dmid, sender) {
        ws.connect({}, function(frame) {
            ws.subscribe("/topic/chat/room/"+dmid, function(message) {
                let recv = JSON.parse(message.body);
                recvMessage(recv);
            });
            ws.send("/app/chat/message", {}, JSON.stringify({dmid:dmid, sender:sender, content:'welcome981117'}));
            }, function(error) {
            console.log('연결 에러!');
            if(reconnect++ <= 5) {
                setTimeout(function() {
                console.log("connection reconnect");
                sock = new SockJS("/ws/chat");
                ws = Stomp.over(sock);
                connect(ws, dmid, sender);
                },10*1000);
            }
        });
    }
    function sendMessage(ws, dmid, sender, content) {
        ws.send("/app/chat/message", {}, JSON.stringify({dmid:dmid, sender:sender, content:content}));
    }
    function getLoc() {
        const loc = location.href
        const index1 = loc.indexOf('/', 7);
        const index2 = loc.indexOf('/', index1+1);
        const newLoc = loc.substring(index1+1, index2);
        if(newLoc==="direct") {
            const index3 = loc.indexOf('/', index2+1);
            return loc.substring(index2+1, index3);
        } else return newLoc;
    }
    function recvMessage(recv) {
        const dmid = recv['dmid'];
        const sender = recv['sender'];
        const content = recv['content'];
        const loc = getLoc();
        console.log(loc);
        if((sender!=loggedInUsername && content!='welcome981117') || (sender==loggedInUsername && content=='welcome981117')) {
            if(loc==='inbox') {
                updateRedPoint();
                insertLastMsg(dmid);
                updateBluePoint(dmid);
            } else if(loc==='t') {

            } else updateRedPoint();
//        } else {
//            if(content=='enter981117') exist = existingNum;
//            else if(content=='out981117') exist = existingNum;
        }
        //console.log(exist);
    }
    $.ajax({
        type:'post',
        url:'../../../direct/allRooms',
        success:function(data) {
            data.forEach(function(dm) {
                const dmid = dm['dmid'];
                const sender = dm['sender'];
                const sock = new SockJS('/ws/chat');
                const ws = Stomp.over(sock);
                connect(ws, dmid, sender);
            });
        },
        error:function() {
        }
    });
    $('#sendShareButton').on('click', function() {
        const children = $('#foundTargetWrapper').children();
        let content = location.href;
        if(content.indexOf('home')!=-1) {
            const boardid = $('#shareModalContainer input[name="boardid"]').val();
            content = 'http://192.168.0.48:8080/view/' + boardid + '/';
        }
        const usernameArr = [];
        children.each(function() {
            usernameArr.push($(this).attr('username'));
        });
        $.ajax({
            type:'post',
            url:'../../../direct/share',
            data:{usernameList:usernameArr, content:content},
            success:function(data) {
                data.forEach(function(dmContent) {
                    const dmid = dmContent['dmid'];
                    const content = dmContent['content'];
                    const sender = dmContent['sender'];
                    const sock = new SockJS('/ws/chat');
                    const ws = Stomp.over(sock);
                    connect(ws, dmid, sender);
                    setTimeout(function() {
                        sendMessage(ws, dmid, sender, content);
                    }, 2000);
                });
                $('#shareModalContainer').css('display', 'none');
            },
            error:function() {
                alert('오류! 관리자에게 문의!');
            }
        });
    });
});