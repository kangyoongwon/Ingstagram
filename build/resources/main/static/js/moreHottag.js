$(document).ready(function() {
    function getMoreHottags() {
        $.ajax({
            type:'post',
            url:'../../../hottag/todayHottag',
            success:function(list) {
                if(list.length>=11) {
                    $('#thShow .imgCon').text('');
                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(drawChart(list));
                } else {
                    $('#thShow .imgCon').text('표시할 데이터가 없습니다.');
                }
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    }
    function drawChart(list) {
        let arr = [['해쉬태그', '개수']];
        list.forEach(function(dto) {
            arr.push([dto['tag'], dto['count']/1]);
        });
        const data = google.visualization.arrayToDataTable(arr);
        const options = {
            title: "HOTTAG",
            is3D: true,
        };
        const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }
    setInterval(getMoreHottags, 1000);
    const $startDate = $('input[name="startDate"]');
    const $endDate = $('input[name="endDate"]');
    const $yaiAge = $('#yaiAge');
    const $yaiYear = $('#yaiYear');
    const $phButton = $('#phButton');
    const $yaiButton = $('#yaiButton');
    let sdFlag = false;
    let edFlag = false;
    let ageFlag = false;
    let yearFlag = false;
    function getToday() {
        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = (today.getMonth() + 1) + "";  // 월
        if(month.length==1) {
            month = '0' + month;
        }
        let date = today.getDate() + "";  // 날짜
        if(date.length==1) {
            date = '0' + date;
        }
        return year + '-' + month +'-' + date;
    }
    function activateButton(button ,flag1, flag2) {
        if(flag1 && flag2) button.removeAttr('disabled');
        else button.attr('disabled', true);
    }
    $startDate.on('input', function() {
        if($(this).val().length!=0) sdFlag = true;
        else sdFlag = false;
        activateButton($phButton, sdFlag, edFlag);
    });
    $startDate.on('blur', function() {
        const edate = $endDate.val();
        const sdate = $startDate.val();
        console.log(edate);
        console.log(sdate);
        if(sdate.length!=0 && edate.length!=0) {
            if(sdate>edate) $startDate.val(edate);
            if(sdate<'2024-04-07') $startDate.val('2024-04-07');
        }
    });
    $endDate.on('input', function() {
        if($(this).val().length!=0) edFlag = true;
        else edFlag = false;
        activateButton($phButton, sdFlag, edFlag);
    });
    $endDate.on('blur', function() {
        const edate = $endDate.val();
        const sdate = $startDate.val();
        console.log(edate);
        console.log(sdate);
        if(edate.length!=0 && sdate.length!=0) {
            if(sdate>edate) $endDate.val(sdate);
            const today = getToday();
            if(edate>today) $endDate.val(today);
        }
    });
    $endDate.on('input')
    $phButton.on('click', function() {
        $('#phShow .imgCon').text('잠시만 기다려 주세요.');
        $('#phShow .imgCon').css('background-image', '');
        const sdate = $startDate.val();
        const edate = $endDate.val();
        $.ajax({
            type:'post',
            url:'../../../hottag/periodHottag',
            data:{sdate:sdate, edate:edate},
            success:function(data) {
                if(data.length!=0) {
                    $('#phDownload').css('display', 'inline');
                    $('#phDownload').attr('link', data[1]);
                    $('#phShow .imgCon').css('background-image', 'url("'+data[0]+'")');
                    $('#phShow .imgCon').text('');
                } else {
                    $('#phDownload').css('display', 'none');
                    $('#phShow .imgCon').text('표시할 데이터가 없습니다.');
                }
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
    $yaiAge.on('blur', function() {
        if($(this).val()!='nothing') ageFlag = true;
        else ageFlag = false;
        activateButton($yaiButton, ageFlag, yearFlag);
    });
    $yaiYear.on('blur', function() {
        if($(this).val()!='nothing') yearFlag = true;
        else yearFlag = false;
        activateButton($yaiButton, ageFlag, yearFlag);
    });
    $yaiButton.on('click', function() {
        $('#yaiShow .imgCon').text('잠시만 기다려 주세요.');
        $('#yaiShow .imgCon').css('background-image', '');
        const age = $yaiAge.val();
        const year = $yaiYear.val();
        $.ajax({
            type:'post',
            url:'../../../hottag/interestHottag',
            data:{age:age, year:year},
            success:function(data) {
                console.log(data);
                console.log(data.length);
                if(data.length!=0) {
                    const imgUrl = data[0];
                    $('#yaiDownload').css('display', 'inline');
                    $('#yaiDownload').attr('link', data[1]);
                    $('#yaiShow .imgCon').css('background-image', 'url("'+imgUrl+'")');
                    $('#yaiShow .imgCon').text('');
                } else {
                    $('#yaiDownload').css('display', 'none');
                    $('#yaiShow .imgCon').text('표시할 데이터가 없습니다.');
                }
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
    $('#phDownload').on('click', function() {
        location.href = "../../../hottag/allFileDownload/" + $('#phDownload').attr('link');
    });
    $('#yaiDownload').on('click', function() {
        location.href = "../../../hottag/allFileDownload/" + $('#yaiDownload').attr('link');
    });
});