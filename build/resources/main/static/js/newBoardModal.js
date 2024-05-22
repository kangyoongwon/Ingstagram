document.addEventListener("DOMContentLoaded", function() {
    //첫번째 모달
    // 모달 열기 버튼

    // var postModalBtn = document.getElementById("postModalBtn");

    // // // 모달창
    // var pm1 = document.getElementById("postModal1");

    // 모달창 내용의 닫기 버튼
    // var postcloseBtn = document.getElementsByClassName("postClose")[0];

    // 모달 열기 버튼 클릭 이벤트 리스너
    // postModalBtn.onclick = function() {
    //     pm1.style.display = "block";
    // }

    // 모달창 내용의 닫기 버튼 클릭 이벤트 리스너
    // postcloseBtn.onclick = function() {
    //     pm1.style.display = "none";
    // }

    // 모달창 외부 클릭 시 모달 닫기
    // window.onclick = function(event) {
    //     if (event.target == pm) {
    //         pm1.style.display = "none";
    //     }
    // }

    //두번째 모달
    // var postModalBtn2 = document.getElementById("postModalBtn2");
    // var pm2 = document.getElementById("postModal2");
    // var postcloseBtn2 = document.getElementsByClassName("postClose2")[0];

    // postModalBtn2.onclick = function() {
    //     pm2.style.display = "block";
    // }

    // postcloseBtn2.onclick = function() {

    // }

    // window.onclick = function(event) {
    //     if (event.target == pm2) {
    //         pm2.style.display = "none";
    //     }
    // }

    //세번째 모달
    // var postModalBtn3 = document.getElementById("postModalBtn3");
    var pm3 = document.getElementById("postModal3");
    var postcloseBtn3 = document.getElementsByClassName("postClose3")[0];

    // postModalBtn3.onclick = function() {
    //     pm3.style.display = "block";
    // }

    postcloseBtn3.onclick = function() {
        pm3.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == pm3) {
            pm3.style.display = "none";
        }
    }


    // textarea 요소에 입력된 글자수를 보여주는 함수
    function showCharacterCount() {
        // textarea 요소를 가져옴
        var textarea = document.getElementById("dtl");
        // 글자수를 표시할 요소를 가져옴
        var countDisplay = document.getElementById("characterCount");
        // textarea에 입력된 글자수를 가져옴
        var count = textarea.value.length;
        // 가져온 글자수를 화면에 표시
        countDisplay.textContent = count + "/1000";
    }

    // textarea에 입력이 발생할 때마다 글자수를 확인하여 표시하는 이벤트 핸들러 등록
    document.getElementById("dtl").addEventListener("input", showCharacterCount);


    //태그 검색 x버튼
    function clearInput() {
        // input 요소를 가져옴
        var inputElement = document.getElementById("tagSearchBar");
        // 입력된 내용을 지움
        inputElement.value = "";
    }

    // "cancel-btn2" 클래스를 가진 요소를 클릭했을 때 clearInput 함수를 호출하는 이벤트 핸들러 등록
    document.querySelector(".cancel-btn2").addEventListener("click", clearInput);


        //파일탐색기 여는
    // function openFileExplorer() {
    // // input 요소를 가져와서 클릭 이벤트를 발생시킴
    //     document.getElementById("fileInput").click();
    // }

    // // 파일이 선택되면 실행될 함수
    // document.getElementById("fileInput").addEventListener("change", function() {
    //     // 선택된 파일들을 가져옴
    //     var selectedFiles = this.files;

    //     // 선택된 파일들에 대한 처리를 수행
    //     // 이 부분에 선택된 파일에 대한 추가 작업을 구현할 수 있습니다.
    // });
});

////////////////////////////////////////////////////////////

$(document).ready(function() {
    let slider = '';
    let index = 0;
    let count = 0;
    function initBxSlider() {
        slider = $(".newBoardModalSlider").bxSlider({
            touchEnabled : (navigator.maxTouchPoints > 0),
            infiniteLoop: false,
            hideControlOnEnd: true,
        });
    }
    // function makeDiv(url) {
    //     let div = '<div index="' + index + '" style="background-image:url(' + "'" + url + "'" + ');">';
    //     div += '<button index="' + index + '" class="removeFileButton"></button></div>';
    //     return div;
    // }
    function makeDiv(fileUrl, index) {
        const fileType = fileUrl.split(',')[0].split(':')[1].split(';')[0];
        if(fileType=='image/jpeg' || fileType=='image/png') {
            let imageDiv = '<div index="' + index + '"><img src="' + fileUrl + '">';
            imageDiv += '<button index="' + index + '" class="removeFileButton"></button></div>';
            return imageDiv;
        } else {
            let videoDiv = '<div index="' + index + '"><video autoplay loop><source src="' + fileUrl + '"></video>';
            videoDiv += '<button index="' + index + '" class="removeFileButton"></button></div>';
            return videoDiv;
        }
    }
    function dragDropInputFile(file) {
        count++;
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([file], file.name));
        $('input[index="' + index + '"]').prop
        ('files', dataTransfer.files);
    }
    function insertInputTag() {
        index++;
        const input = '<input type="file" name="files" index="' + index + '">';
        $('#filesForm').append(input);
        return index;
    }
    function dragDropPreview(fileList) {
        for(let i = 0; i < fileList['length']; i++) {
            const index = insertInputTag();
            dragDropInputFile(fileList[i]);
            const reader = new FileReader();
            reader.onload = function(event) {
                const div = makeDiv(event.target.result, index);
                $('#filePreview').append(div);
                if(i===fileList.length-1) {
                    if(count>=2) initBxSlider();
                }
            };
            reader.readAsDataURL(fileList[i]);
        }
    }
    function fileExplorerPreview(fileList) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const div = makeDiv(event.target.result, index);
            $('#filePreview').append(div);
            if(count>=2) initBxSlider();
        };
        reader.readAsDataURL(fileList[0]);
    }
    $('#fileDragDrop').on('dragover', function(event) {
        event.preventDefault();
        console.log('dragover');
    });
    $('#fileDragDrop').on('drop', function(event) {
        event.preventDefault();
        console.log('drop');
        const dataTransfer = event.originalEvent.dataTransfer;
        const fileList = dataTransfer.files;
        dragDropPreview(fileList);
        displayModal2();
    });
    $('.photobtn').on('click', function() {
        console.log(index);
        insertInputTag();
        console.log(index);
        $('input[index="' + index + '"]').click();
    });
    $('#filesForm').on('change', 'input', function(event) {
        if(typeof slider!="string") {
            slider.destroySlider();
        }
        count++;
        const fileList = event.target.files;
        fileExplorerPreview(fileList);
        displayModal2();
    });
    function displayModal2() {
        if($('#postModal2').css('display')==='none') {
            $('#postModal1').css('display', 'none');
            $('#postModal2').css('display', 'block');
        }
    }
    function displayModal1() {
        $('#postModal2').css('display', 'none');
        $('#postModal1').css('display', 'block');
    }
    $('#filePreview').on('click', 'button', function() {
        if(typeof slider!="string") {
            slider.destroySlider();
        }
        count--;
        const index = $(this).attr('index');
        $('input[index="' + index + '"]').remove();
        $('div[index="' + index + '"]').remove();
        if(count==1) slider.destroySlider();
        else if(count==0) displayModal1();
        else initBxSlider();
    });
    $('#addMoreFile').on('click', function() {
        insertInputTag();
        $('input[index="' + index + '"]').click();
    });
    $('#share').on('click', function() {
        const content = $('#dtl').val();

        console.log(content);

        const tag = $('#tagSearchBar').val();
        const files = $('input[name="files"]').val();
        const form = document.getElementById('filesForm');
        const formData = new FormData(form);
        formData.append('content', content);
        formData.append('tag', tag);
        $.ajax({
            type:'post',
            url:'../../../board/boardUpload',
            data:formData,
            processData:false,
            contentType:false,
            success:function(data) {
                $('#postModal2').css('display', 'none');
                $('#postModal4').css('display', 'block');
            },
            error:function(data) {
                alert('에러! 관리자에게 문의');
            }
        });
    });
    $('#postCloseButton1').on('click', function() {
        $('#postModal1').css('display', 'none');
    });
    $('#postModal2').on('click', function(event) {
        if(event['target']===$(this)['0']) {
            $('#postModal3').css('display', 'block');
        }
    });
    $('#postCloseButton2').on('click', function() {
        $('#postModal3').css('display', 'block');
    });
    $('#initEverything').on('click', function() {
        initAll();
    });
    function initAll() {
        $('#postModal1, #postModal2, #postModal3, #postModal4, #updateBoardModal').css('display', 'none');
        $('#filePreview, #fileShow').empty();
        $('#filesForm').empty();
        $('#filesForm').append('<textarea id="textareaSubmit" name="content"></textarea><input type="text" id="textSubmit" name="tag">');
        if(typeof slider!='string') slider.destroySlider();
        index = 0;
        count = 0;
        slider = '';
        $('#dtl, #tagSearchBar, #updateTextarea, #updTagSearchBar').val('');
    }
    $('#openNewBoardModal, #newBoardButton, #dmMakesNewButton, #shirinkedMakesNewButton').on('click', function(event) {
        event.preventDefault();
        $('#postModal1').css('display', 'block');
    });
    $('#postCloseButton4').on('click', function() {
        initAll();
    });
    $('#postModal4').on('click', function() {
       if(event['target']===$(this)['0']) {
            initAll();
       }
    });

    $('#updateMine').on('click', function() {
        const boardid = $('#content1').attr('class');
        $.ajax({
            type:'get',
            url:'../../../board/boardUpdate',
            data:{boardid:boardid},
            success:function(data) {
                const board = data['board'];
                const filesArr = data['filesList'];
                const tagArr = data['tagList'];
                console.log(tagArr);
                $('input[name="updateBoardid"]').val(board['boardid']);
                $('#updateTextarea').val(board['content']);
                let e = '';
                filesArr.forEach(function(files) {
                    if(board['parentid']==-1) {
                        e += '<video autoplay loop><source src="'+files['path']+'"></video>';
                    } else {
                        e += '<img src="'+files['path']+'">';
                    }
                });
                $('#fileShow').append(e);
                if(filesArr.length>1) {
                    slider = $('.updateBoardSlider').bxSlider({
                        touchEnabled : (navigator.maxTouchPoints > 0),
                        infiniteLoop: false,
                        hideControlOnEnd: true,
                    });
                }
                let tags = '';
                tagArr.forEach(function(tag) {
                    tags += tag + ' ';
                });
                const text = $('#updateTextarea').val();
                $('#updateCharacterCount').text(text.length + '/1000');
                $('#updTagSearchBar').val(tags);
                $('#boardMenuModal2').css('display', 'none');
                $('#updateBoardModal').css('display', 'block');
            },
            error:function() {
                alert('에러! 관리자에게 문의');
            }
        });
    });
    $('#updateTextarea').on('keyup', function() {
        const text = $(this).val();
        $(this).text(text.length + '/1000');
    });
    $('.upd_cancel_btn2').on('click', function() {
        $('#updTagSearchBar').val('');
    });
    $('#updateBoardModal').on('click', function(event) {
        if(event['target']===$(this)['0']) {
            initAll();
        }
    });
    $('#updPostCloseButton2, #updateCancel').on('click', function() {
         initAll();
    });
    $('#updateComplete').on('click', function() {
        const boardid = $('input[name="boardid"]').val();
        let content = $('#updateTextarea').val();
        content = content.replace("\r\n","<br>");
        const tag = $('#updTagSearchBar').val();
        $.ajax({
            type:'post',
            url:'../../../board/boardUpdate',
            data:{boardid:boardid, content:content, tag:tag},
            success:function(board) {
                $('#mainContent .contentArea a').after(' ' + board['content']);
                initAll();
            },
            error:function() {
                alert('오류! 관리자에게 문의');
            }
        });
    });
});