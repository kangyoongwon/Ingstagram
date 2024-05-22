//lastIndex = 40;
$(document).ready(function() {
    $(window).on('scroll', function() {
        let loc = $(window).scrollTop();
        let height1 = $(window).height();
        let height2 = $(document).height();
        if(height2-(loc+height1)<=0) {
            $.ajax({
                type:'get',
                url:'../../../../explore/nextPage',
                success: function(data) {
                    let elements = '';
                    data.forEach(function(dto) {
                        if(dto['index']%5==1) elements += '<div class="divGrid">';
                        if(dto['parentid']==0) {
                            elements += '<button flag="explore" index="' + dto['index'] + '" id="' + dto['boardid'] + '">';
                            elements += '<img src="' + dto['filepath'] + '"></button>';
                        } else {
                            if(dto['index']%5==0) {
                                if(dto['index']%10==0) {
                                    elements += '<button flag="explore" class="l5" index="' + dto['index'] + '" id="' + dto['boardid'] + '">';
                                    elements += '<video><source src="' + dto['filepath'] + '"></video></button>';
                                } else {
                                    elements += '<button flag="explore" class="r5" index="' + dto['index'] + '" id="' + dto['boardid'] + '">';
                                    elements += '<video><source src="' + dto['filepath'] + '"></video></button>';
                                }
                                elements += '</div>';
                            } else {
                                elements += '<button flag="explore" index="' + dto['index'] + '" id="' + dto['boardid'] + '">';
                                elements += '<video><source src="' + dto['filepath'] + '"></video></button>';
                            }
                        }
//                        lastIndex = dto['index'];
                    });
                    $('#gridContainer').append(elements);
                },
                error: function() {
                    alert("오류! 관리자에게 문의");
                }
            });
        }
    });
});
