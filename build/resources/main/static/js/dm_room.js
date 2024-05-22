$(document).ready(function() {
    $('#chatTextarea textarea').focus();
    let currentWS = '';
    let exist = -1;
    const currentRoomDmid = getCurrentRoomDmid();
    const loggedInUsername = $('#loggedInUsername').text();
    $.ajax({
        type:'post',
        url:'../../../../direct/readUpdate',
        data:{dmid:currentRoomDmid},
        success:function() {
            //updateRedPoint();
            //updateBluePoint(currentRoomDmid);
        },
        error:function() {
            alert('에러! 관리자에게 문의');
        }
    });
    function getCurrentRoomDmid() {
        let k = location.href;
        k = k.substring(0, k.length-1);
        return k.substring(k.lastIndexOf('/')+1);
    }
    function moveToBottom() {
            $('#chatMain').scrollTop($('#chatMain').prop('scrollHeight'));
    }
    moveToBottom();
    function connect(ws, dmid, sender) {
        ws.connect({}, function(frame) {
            ws.subscribe("/topic/chat/room/"+dmid, function(message) {
                let recv = JSON.parse(message.body);
                recvMessage(recv);
            });
            if(dmid==currentRoomDmid)
                ws.send("/app/chat/message", {}, JSON.stringify({dmid:dmid, sender:sender, content:'enter981117'}));
            else
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
    function getToday() {
        let today = new Date();
        let year = today.getFullYear();
        let month = (today.getMonth()+1)+'';
        if(month.length==1) month = '0' + month;
        let date = today.getDate()+'';
        if(date.length==1) date = '0' + date;
        return year + '-' + month + '-' + date;
    }
    function recvMsgInRoom(recv) {
        //inboxRecvMsg(recv);
        const dmid = recv['dmid'];
        const content = recv['content'];
        const msgSender = recv['sender'];
        const photo = $('input[name="photo"]').val();
        const msgReceiver = $('input[name="receiver"]').val();
        const today = getToday();
        if($('.dmChatDate:last').text()!=today) {
            let e0 = '<div class="dmChatDate">'+today+'</div>';
            $('#dmChatContents').append(e0);
        }
        if(msgSender===loggedInUsername) {
            let e1 = '';
            if(content.indexOf('http://')!=-1) {
                e1 = '<div class="dmChatRight"><p><a href="'+content+'">' + content + '</a></p></div>';
            } else {
                e1 = '<div class="dmChatRight"><p>' + content + '</p></div>';
            }
            $('#dmChatContents').append(e1);
        } else {
            let e2 = '';
            if(content.indexOf('http://')!=-1) {
                e2 = '<div class="dmChatLeft"><img src="' + photo + '">';
                e2 += '<p><a href="'+content+'">' + content + '</a></p></div>';
            } else {
                e2 = '<div class="dmChatLeft"><img src="' + photo + '">';
                e2 += '<p>' + content + '</p></div>';
            }
            $('#dmChatContents').append(e2);
        }
        //$('#dmRoomListSection3').prepend($('#dmRoomListSection3 button[dmid="' + currentRoomDmid + '"]'));
        const element = $('#dmRoomListSection3 button[dmid="' + currentRoomDmid + '"]');
        if(element.length!=0) $('#dmRoomListSection3').prepend(element);
        else {
            $('#noChatRoom').remove();
            let newElement = '';
            newElement += '<button dmid="' + dmid + '" class="dmRoomWrapper">';
            newElement += '<div class="counterpartPhoto">';
            newElement += '<img src="' + photo + '">';
            newElement += '</div>';
            newElement += '<div class="dmRoomInfo">';
            newElement += '<div class="counterpartName">' + msgReceiver + '</div>';
            newElement += '<div class="lastMessageInfo">';
            newElement += '<span class="lastMessageContent">마지막 메시지</span>';
            newElement += '<span class="lastMessageTime">마지막 시간</span>';
            newElement += '</div></div></button>';
            $('#dmRoomListSection3').prepend(newElement);
        }
        moveToBottom();
    }
    function recvMessage(recv) {
        const dmid = recv['dmid'];
        const sender = recv['sender'];
        const content = recv['content'];
        const existingNum = recv['exist'];
        if((sender==loggedInUsername && content=='enter981117') || (content!='welcome981117' && content!='enter981117' && content!='out981117')) {
            if(content=='enter981117') exist = existingNum;
            updateRedPoint();
            insertLastMsg(dmid);
            updateBluePoint(dmid);
            const currentRoomDmid = getCurrentRoomDmid();
            if(currentRoomDmid==dmid && content!='enter981117') {
                recvMsgInRoom(recv);
                insertLastMsg(dmid);
            }
        } else {
            if(content=='enter981117') exist = existingNum;
            else if(content=='out981117') exist = existingNum;
        }
        //console.log(exist);
    }
    $.ajax({
        type:'post',
        url:'../../../../direct/allRooms',
        success:function(data) {
            data.forEach(function(dm) {
                const dmid = dm['dmid'];
                const sender = dm['sender'];
                const sock = new SockJS('/ws/chat');
                const ws = Stomp.over(sock);
                connect(ws, dmid, sender);
                if(dmid==currentRoomDmid) {
                    currentWS = ws;
                    sendMessage(ws, dmid, sender, 'enter981117');
                }
            });
        },
        error:function() {
        }
    });
    const sendingTA = $('textarea[name="sendingDMContent"]');
    const send = $('#sendDMContent');
//    sendingTA.on('keyup', function(event) {
//        const content = trimData(sendingTA.val());
//        if(event.which===13) {
//            event.preventDefault();
//            if(content) {
//                if(content.length==0) {
//                    sendingTA.val('');
//                } else {
//                    send.click();
//                }
//            }
//        }
//        if(content) {
//            if(content.length>0) send.css('display', 'inline');
//            else send.css('display', 'none');
//        } else send.css('display', 'none');
//    });

    sendingTA.on('input', function(event) {
        const content = trimData(sendingTA.val());
        if(content && content.length>0) {
            send.css('display', 'inline');
        } else {
            send.css('display', 'none');
        }
    });
    sendingTA.on('keydown', function(event) {
        if(event.which==13) {
            event.preventDefault();
            if(send.css('display')=='block') {
                    send.click();
            } else {
                send.val('');
            }
        }
    });
    send.on('click', function(event) {
        event.preventDefault();
        const content = trimData(sendingTA.val());
        sendMessage(currentWS, currentRoomDmid, loggedInUsername, content);
        sendingTA.val('');
        send.css('display', 'none');
    });
    $(window).on('beforeunload', function(event) {
        sendMessage(currentWS, currentRoomDmid, loggedInUsername, 'out981117');
    });
});



