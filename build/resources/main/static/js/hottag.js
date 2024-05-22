$(document).ready(function() {
    function getHottags() {
        $.ajax({
            type:'post',
            url:'../../../hottag/simpleHottag',
            success:function(data) {
                if(data.length==0) {

                } else {
                    let i = 2;
                    data.forEach(function(hottag) {
                        const $a = $('.right_feed .tag:nth-of-type(' + i + ')').find('a');
                        $a.attr('href', '../../../explore/tags/' + hottag + '/');
                        $a.text(hottag);
                        ++i;
                    });
                }
            },
            error:function() {
                alert('failed');
            }
        });
    }
    setInterval(getHottags, 1000);
    $('#goToMoreHottag').on('click', function() {
        location.href = '../../../hottag/moreHottag/';
    });
});