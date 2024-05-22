$(document).ready(function() {
    const $searchInput = $('#searchInput');
    const $deleteAll = $('#deleteAll');
    const $searchRecord = $('#searchRecord');
    const $searchRecordHead = $('#searchRecordHead');
    const $searchRecordBody = $('#searchRecordBody');
    const $searchNew = $('#searchNew');
    function makeUserSearchElements(member, flag, searchid) {
        let e = '';
        e += '<button class="searchMainGrid">';
        e += '<input type="hidden" name="username" value="' + member['username'] + '">';
        e += '<input type="hidden" name="searchid" value="' + searchid + '">';
        e += '<img src="' + member['photo'] + '">';
        e += '<div class="searchMainInfo">';
        e += '<div>' + member['name'] + '</div>';
        e += '<div>' + member['username'] + '</div>';
        e += '</div>';
        if(flag==1) {
            e += '<div class="xArea">&times;</div>';
        }
        e += '</button>';
        return e;
    }
    function makeTagSearchElements(tag, flag, searchid) {
        let e = '';
        const tagAttr = tag.substring(1);
        e += '<button class="searchMainGrid">';
        e += '<input type="hidden" name="tag" value="' + tagAttr + '">';
        e += '<input type="hidden" name="searchid" value="' + searchid + '">';
        e += '<img src="/imgs/hashtag.png">';
        e += '<div class="searchMainInfo">';
        e += tag;
        e += '</div>';
        if(flag==1) {
            e += '<div class="xArea">&times;</div>';
        }
        e += '</button>';
        return e;
    }

    $('#searchModal').on('click', function(event) {
        event.preventDefault();
        if(event['target']===$(this)['0']) {
            $('.navbar').css('display', 'block');
            $(this).css('display', 'none');
        }
    });
    $('#searchButton, #openSearchModal, #shirinkedSearchButton, #dmSearchButton').on('click', function(event) {
        event.preventDefault();
        $('#alarmModal').css('display', 'none');
        $.ajax({
            type:'post',
            url:'../../../../search/recordedSearchList',
            success:function(data) {
                console.log(data);
                if(data.length==0) {
                    if($('.smNothing').length==0)
                        $searchRecordBody.append('<div class="smNothing">최근 검색 내역 없음.</div>');
                } else $deleteAll.css('display', 'inline-block');
                data.forEach(function(dto) {
                    const searchList = dto['searchList'];
                    const searchid = searchList['searchid'];
                    const member = dto['member'];
                    let e = '';
                    if(dto['member']!=null) {
                        e = makeUserSearchElements(member, 1, searchid);
                    } else {
                        const tag = searchList['content'];
                        e = makeTagSearchElements(tag, 1, searchid);
                    }
                    $searchRecordBody.append(e);
                });
            },
            error:function(data) {
            }

        });
        $('#searchModal').css('display', 'block');
        $('.navbar').css('display', 'none');
        $searchInput.focus();
    });
    $searchInput.on('keyup', function() {
        const content = trimData($(this).val());
        console.log(content);
        if(content.length<=0) {
            $searchRecord.css('display', 'block');
            $searchNew.css('display', 'none');
        }
        else {
            $.ajax({
                type:'post',
                url:'../../../../search/newSearchList',
                data:{data:content},
                success:function(data) {
                    $searchNew.empty();
                    data.forEach(function(dto) {
                        let e = '';
                        const member = dto['member'];
                        if(member!=null) {
                            e = makeUserSearchElements(member, 0, 0);
                        } else {
                            e = makeTagSearchElements(dto['tag'], 0, 0);
                        }
                        $searchNew.append(e);
                        $searchRecord.css('display', 'none');
                        $searchNew.css('display', 'block');
                    });
                }
            });
        }
    });
    $('#searchNew, #searchRecordBody').on('click', 'button', function() {
        const username = $(this).find('input[name="username"]').val();
        const tag =  $(this).find('input[name="tag"]').val();
        let content = '';
        console.log(username);
        console.log(tag);
        if(username!=undefined) {
            content = username;
            //alert('프로필로 이동');
            location.href = '../../../../' + username + '/';
        }
        if(tag!=undefined) {
            content = "#" + tag;
            location.href = '../../../../explore/tags/' + tag + '/';
        }
        $.ajax({
            type:'post',
            url:'../../../../search/searchListInsert',
            data:{content:content},
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
    $deleteAll.on('click', function() {
        const searchidArr = [];
        const children = $searchRecordBody.children();
        children.each(function() {
            searchidArr.push($(this).find('input[name="searchid"]').val());
        });
        $.ajax({
            type:'post',
            url:'../../../../search/allDelete',
            data:{searchidList:searchidArr},
            success:function() {
                $deleteAll.css('display', 'none');
                $searchRecordBody.empty();
                $searchRecordBody.append('<div class="smNothing">최근 검색 내역 없음.</div>');
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    })
    $searchRecordBody.on('click', '.xArea', function(event) {
        event.stopPropagation();
        const target = $(this).closest('button');
        const searchid = target.find('input[name="searchid"]').val();
        console.log(target);
        console.log(searchid);
        $.ajax({
            type:'post',
            url:'../../../../search/oneDelete',
            data:{searchid:searchid},
            success:function() {
                target.remove();
                if($searchRecordBody.children().length<=0) {
                    $deleteAll.css('display', 'none');
                    $searchRecordBody.append('<div class="smNothing">최근 검색 내역 없음.</div>');
                }
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
});