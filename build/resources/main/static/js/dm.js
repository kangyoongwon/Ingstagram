$(document).ready(function() {
    const sendingTA = $('textarea[name="sendingDMContent"]');
    const send = $('#sendingTA');
    $('.dmRoomWrapper').on('click', function() {
        const dmid = $(this).attr('dmid');
        location.href = '../../../../direct/t/' + dmid + '/';
    });
//    sendingTA.on('keyup', function(event) {
//        if(event.which===13) send.click();
//    });
//    send.on('click', function(event) {
//        const content = trimData(sendingTA.val());
//    });
});