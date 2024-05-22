$(document).ready(function(){

    //프사 변경 기능
    $('#selfieChange').on('click', function(){
        console.log("프사가 클릭되었습니다.");
        //
        const profileImgPath = $('#selfieChange img').attr('src');
        if(profileImgPath.indexOf("profileIndex")!=-1) {
            $('.btn-delete-photo').css('display', 'none');
            $('.editProfilePhotoContainer .line:last').css('display', 'none');
        } else {
            $('.btn-delete-photo').css('display', 'inline-block');
            $('.editProfilePhotoContainer .line:last').css('display', 'block');
        }
        //

        $('.editProfilePhotoModal').css('display', 'block');
    });
    $('.btn-upload-photo').on('click', function(){
        $('#editProfilePhoto').click();
    });
    $('.btn-delete-photo').on('click', function(){
        $.ajax({
            url:'deleteProfilePhoto',
            type: 'POST',
            success: function(data){
                console.log("프로필 사진 삭제 성공:", data);
                $('#profilePhotoImg').attr('src', data);
                $('#mainProfilePhoto').attr('src', data);

                // 프로필 사진 삭제 후 모달 창 닫기
                $('.editProfilePhotoModal').css('display', 'none');
            },
            error: function(error) {
            console.error('Error uploading profile photo:', error);
            }
        });
    });
    $('.btn-cancel').on('click', function(){
       $('.editProfilePhotoModal').css('display', 'none');
    });


    $('#editProfilePhoto').change(function(){
        var file = this.files[0];
        var formData = new FormData();
        formData.append('photo', file);

        $.ajax({
            url: 'uploadProfilePhoto',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                 console.log('프로필 사진 업로드 성공:', data);
                  $('#profilePhotoImg').attr('src', data);
                  $('#mainProfilePhoto').attr('src', data);
                  $('.profilePicture').attr('src', data);
                  $('.profilePhoto').attr('src', data);

                  // 프로필 사진 삭제 후 모달 창 닫기
                  $('.editProfilePhotoModal').css('display', 'none');
            },
            error: function(error) {
                console.error('Error uploading profile photo:', error);
            }
        });
    });

    // ----------------------------- <프로필 편집 & 설정 모달> ----------------------------
    //프로필 편집
    $('.probtn').on('click', function(){
        $('.editProfileInfoModal').css('display', 'block');
        $('.userInfoBoxModal').css('display', 'block');
    });

    //프로필 편집 모달창 닫기
    $('.closeUserInfoButton, .closeEditModalButton, .closeEditSettingButton').on('click', function(){
       // 프로필 편집 모달과 사용자 정보 상자를 숨김
       $('.editProfileInfoModal').css('display', 'none');
       $('.editNameModal').css('display', 'none');
       $('.editUsernameModal').css('display', 'none');
       $('.editPhotoModal').css('display', 'none');
       $('.editBioModal').css('display', 'none');
       $('.editSettingModal').css('display', 'none');
       $('.userInfoBoxModal').css('display', 'none');
    });

    // 프로필 편집 창에 있는 각각의 버튼들 (이름, 사용자이름, 프사, 소개글)
    // ----------------------------- <이름 편집 모달> ----------------------------

    $('.editName').on('click', function(){
       // 이름 편집 모달 열기
       $('.editNameModal').css('display', 'block');
       //////////////////모달창이 켜질 때 기존 이름 세팅
       $('.editNameInput').text($('.profileName').text());
       //////////////////
       $('.userInfoBoxModal').css('display', 'block');
    });

    $('.backToEditButton').on('click', function(){
        $('.editProfileInfoModal').css('display', 'block');
        $('.userInfoBoxModal').css('display', 'block');
        $('.editNameModal').css('display', 'none');
    });

    // 이름 편집 모달이 열릴 때
    $('.editNameModal').on('shown.bs.modal', function() {

        $('.editNameInput').focus();
        // 텍스트 상자의 값이 없으면서 포커스가 아직 주어지지 않았을 때
        if ($('.editNameInput').val() === '' && !$('.editNameInput').is(':focus')) {
            // userNameLabel을 보이게 함
            $('.userNameLabel').show(); //기본으로 시작부터 userNameLabel + user의 이름 보이게함
        }
    });


     // X 버튼을 클릭하여 입력 필드의 값을 지우는 함수
     $('.clearInputButton').click(function() {
         console.log('X버튼이 눌림');
         var $inputField = $(this).closest('.editNameInputContainer').find('.editNameInput');
         $inputField.val('');
         $inputField.focus(); // 텍스트를 지우고 포커스를 주는 동작
         var $userNameLabel = $(this).siblings('.userNameLabel');
         $userNameLabel.show(); // 입력 필드를 지우면서 userNameLabel를 보이도록 함.
         $(this).hide();
         updateSubmitButtonState($inputField);
     });

    // 입력 필드의 내용이 변경될 때 완료 버튼 활성/비활성화
    $('.editNameInput').on('input', function() {
        updateSubmitButtonState($(this));
        var $clearInputButton = $(this).siblings('.clearInputButton');
        const content = trimData($(this).val());
        if (content && content.length != 0) {
            $clearInputButton.show();
        } else {
            $clearInputButton.hide();
        }
    });

     // 완료 버튼 활성/비활성화
     function updateSubmitButtonState($inputField) {
         var $submitButton = $inputField.closest('.editNameModalContent').find('.editNameSubmitButton');
         const content = trimData($inputField.val());
         if (content && content.length != 0) {
            const originalName = $('.profileName').text();
            if(originalName==content) $submitButton.prop('disabled', true);
             else $submitButton.prop('disabled', false); //입력 필드가 공백이 아니면
         } else {
             $submitButton.prop('disabled', true); //입력 필드가 공백이면 (처음 X버튼 없애봤으면 그뒤로는 버튼이 계속 활성화됨)
         }
     }

     // 입력 필드에 포커스를 주는 함수
     $('.editNameInput').focus(function() {
         var $inputField = $(this);
         const content = trimData($inputField.val());
         if (content && content.length > 0) {
             $inputField.siblings('.clearInputButton').show(); // 입력 필드에 내용이 있으면 X 버튼을 보이도록 합니다.
             $inputField.siblings('.userNameLabel').show(); // 포커스가 입력 필드에 있을 때 userNameLabel을 보여줌.
         } else {
            $inputField.attr('placeholder', '');
            $inputField.siblings('.userNameLabel').show();
         }
     }).blur(function() {
         var $inputField = $(this);
         // 입력 필드를 벗어나면 실행되는 함수
         if ($inputField.val() === '') {
            $inputField.attr('placeholder', '이름');
            $inputField.siblings('.userNameLabel').hide();
         }
     });

     // 텍스트 상자에 포커스가 해제되었을 때
     $('.editNameInput').blur(function() { //문자가 있는경우
         if ($(this).val() === '') {
             $(this).attr('placeholder', '이름'); // placeholder가 보이게함.
             $(this).siblings('.clearInputButton').hide(); // X 버튼을 숨김
         }
     });

     $('.editNameSubmitButton').click(function(){
        var newName = $('.editNameInput').val();
        $.ajax({
                url: 'uploadName',
                type: 'POST',
                data: {name: newName},
                success: function(data) {
                     console.log('이름 변경 성공:', data);
                      $('.editBoxUsername').text(data);
                      $('.profileName').text(data);
                      // 이름 변경 모달 창 닫기
                      $('.editNameModal').css('display', 'none');
                      // 프로필 편집 모달 창 열기
                      $('.editProfileInfoModal').css('display', 'block');
                },
                error: function(error) {
                    console.error('Error changing your name:', error);
                }
            });
     });

     // ----------------------------- <사용자 이름 편집 모달> ----------------------------

     $('.editUserName').on('click', function(){
        $('.userInfoBoxModal').css('display', 'block');
        $('.editUsernameModal').css('display', 'block');
     });

     $('.backToEditButton').on('click', function(){
         $('.editProfileInfoModal').css('display', 'block');
         $('.userInfoBoxModal').css('display', 'block');
         $('.editUsernameModal').css('display', 'none');
     });

     // 모달 열리면
     $('.editUsernameModal').on('shown.bs.modal', function() {
        console.log("모달 잘열림");
         $(this).find('.editUsernameInput').focus();
     });

     // 입력창에 포커스 잡혔을 경우
     $('.editUsernameInput').focus(function(){
        var $inputField = $(this);
        var $warningMessage = $inputField.closest('.editUsernameContainer').find('.editWarning');
        const content = trimData($inputField.val());
        if(!content) return false;
        if (content && content.length > 0){
            $inputField.siblings('.clearUsernameInputButton').show();
            $inputField.siblings('.usernameTag').show();
            $warningMessage.css('display', 'none');
        } else{
            $inputField.attr('placeholder', '');
            $inputField.siblings('.usernameTag').show();
            $warningMessage.css('display', 'block');
        }
     }).blur(function(){ //포커스 풀렸을 경우
        var $inputField = $(this);
        var $warningMessage = $inputField.closest('.editUsernameContainer').find('.editWarning');

        if (trimData($inputField.val()).length === 0){
            $inputField.attr('placeholder', '사용자 이름');
            $inputField.siblings('.usernameTag').hide();
            $inputField.siblings('.clearUsernameInputButton').hide();

            $inputField.css('border-color', '#c40023'); // 포커스를 뺐을 때 빨간색으로 변경
            $inputField.siblings('.usernameTag').css('color', '#c40023'); // 포커스를 뺐을 때 빨간색으로 변경
            $warningMessage.css('display', 'block');

        } else{
            $inputField.css('border-color', '#082443'); // 입력이 있을 때 원래 색으로 복구
            $inputField.siblings('.usernameTag').css('color', '#666'); // 입력이 있을 때 원래 색으로 복구
            $warningMessage.css('display', 'none');
        }
     });

     // 입력창 필드 지우는 X버튼 클릭시
     $('.clearUsernameInputButton').on('click', function(){
        var $inputField = $(this).closest('.editUsernameInputContainer').find('.editUsernameInput');
        $inputField.val('');
        $inputField.focus();
        var $usernameTag = $(this).siblings('.usernameTag');
        $usernameTag.show();
        $(this).hide();
        updateUsernameState($inputField);

        $usernameTag.css('color', '#c40023');
        $inputField.css('border-color', '#c40023');

     });

     // 입력 필드의 내용이 변경될 때
     $('.editUsernameInput').on('input', function(){
         updateUsernameState($(this));
         var $clearInputButton = $(this).siblings('.clearUsernameInputButton');
         var $warningMessage = $(this).closest('.editUsernameContainer').find('.editWarning');
         const content = trimData($(this).val());
         if(content && content.length != 0) {
            $clearInputButton.show();
            $(this).css('border-color', '#082443'); // 입력이 있을 때 원래 색으로 복구
            $(this).siblings('.usernameTag').css('color', '#666');
            $warningMessage.css('display', 'none');

         } else{
            $clearInputButton.hide();
            $warningMessage.css('display', 'block');
         }
     });

     // 완료 버튼 활성/비활성화
     function updateUsernameState($inputField){
        var $completeButton = $inputField.closest('.editUsernameModalContent').find('.editUsernameSubmitButton');
        const content = trimData($inputField.val());
        $('.con1 span').text();
        if(content && content.length != 0){ //공백이 아니면
//            if(content)
//            else
            $completeButton.prop('disabled', false);
        } else{ //공백이면
            $completeButton.prop('disabled', true);
        }
     }
     // 완료 버튼 누를시
     $('.editUsernameSubmitButton').on('click', function(){
        var newUsername = $('.editUsernameInput').val();
        $.ajax({
            url: 'uploadUsername',
            type: 'POST',
            data: {username: newUsername},
            success: function(data){
                console.log('유저네임변경성공: ', data);
                $('#loggedInUsername').text(data);
                // 유저네임 변경 모달 창 닫기
                $('.editUsernameModal').css('display', 'none');
                // 프로필 편집 모달 창 열기
                $('.editProfileInfoModal').css('display', 'block');
            },
            error: function(error) {
                console.error('유저네임 유효성 검사 실패:', error);
                var $warningMessage = $('.editWarning');
                var $completeButton = $('.editUsernameSubmitButton');
                $warningMessage.text(error.responseText);
                $warningMessage.css('display', 'block');
                $completeButton.prop('disabled', true);
            }
        });
     });

      // ----------------------------- <프사 편집 모달> ----------------------------
      $('.editPhoto').on('click',function(){
        $('.userInfoBoxModal').css('display', 'block');
        $('.editPhotoModal').css('display', 'block');
      });

      $('.backToEditButton').on('click', function(){
          $('.editProfileInfoModal').css('display', 'block');
          $('.userInfoBoxModal').css('display', 'block');
          $('.editPhotoModal').css('display', 'none');
      });

      $('.editPhotoSubmitButton').on('click', function(){
          $('#changeProfilePhoto').click();
      });
      $('#changeProfilePhoto').change(function(){
        var file = this.files[0];
        console.log(file);
        var formData = new FormData();
        formData.append('photo', file);
        console.log(formData);

        $.ajax({
            url: 'uploadProfilePhoto',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                 console.log('프로필 사진 편집 성공:', data);
                  $('#profilePhotoImg').attr('src', data);
                  $('#mainProfilePhoto').attr('src', data);
                  $('.profilePhoto').attr('src', data);
                  $('.profilePicture').attr('src', data);

                  $('.editPhotoModal').css('display', 'none');
            },
            error: function(error) {
                console.error('Error changing profile photo:', error);
            }
        });
      });
      // ----------------------------- <소개 편집 모달> ----------------------------
      $('.editBio').on('click', function(){
            $('.userInfoBoxModal').css('display', 'block');
            $('.editBioModal').css('display', 'block');
      });
      $('.backToEditButton').on('click', function(){
           $('.editProfileInfoModal').css('display', 'block');
           $('.userInfoBoxModal').css('display', 'block');
           $('.editBioModal').css('display', 'none');
      });

      //지울때
      $('.clearBioInputButton').on('click', function(){
           $('.editBioInput').val('');
           $('.bioCounter').text('0/250');
           $('.editBioSubmitButton').prop('disabled', true);
           $('.bioCounter').css('color', '#999');
           $('.editBioInput').css('border-color', '#ccc');
           $('.editBioWarning').css('display','none');
      });

      //입력시
      $('.editBioInput').on('input', function(){
        var textLength = $(this).val().length;
        var maxLength = 165;
        var text = $(this).val();

        $('.bioCounter').text(textLength + '/250');

        if(textLength > 165){
            if(textLength > maxLength){
                var trimmedText = text.substring(0, maxLength);
                $(this).val(trimmedText);
            }
            $('.editBioWarning').css('display','block');
            $('.editBioSubmitButton').prop('disabled', true);
            $('.bioCounter').css('color', '#c40023');
            $('.editBioInput').css('border-color', '#c40023');

        }else{
            $('.editBioWarning').css('display','none');
            $('.editBioSubmitButton').prop('disabled', false);
            $('.bioCounter').css('color', '#999');
            $('.editBioInput').css('border-color', '#ccc');

        }
      });

      $('.editBioSubmitButton').on('click',function(){
         var newBio = $('.editBioInput').val();
         $.ajax({
                url: 'uploadBio',
                type: 'POST',
                data: {bio: newBio},
                success: function(data) {
                     console.log('소개 변경 성공:', data);
                      $('.profileBio').text(data);
                      $('.editBioModal').css('display', 'none');
                      // 프로필 편집 모달 창 열기
                      $('.editProfileInfoModal').css('display', 'block');
                },
                error: function(error) {
                    console.error('Error changing your bio:', error);
                }
            });
      });
      // ----------------------------- <설정 아이콘 모달> ----------------------------
      $('#setOpenModalImg').on('click', function(){
         $('.setModal').css('display','block');
      });

      // 프로필 화면에 설정아이콘
      $('.userInfoSetting').on('click', function(){
         $('.setModal').css('display', 'none');
         $('.userInfoBoxModal').css('display', 'block');
         $('.editSettingModal').css('display', 'block');
      });

      // 취소 버튼
      $('#setCloseModalBtn').on('click', function(){
         $('.setModal').css('display','none');
         $('.userInfoBoxModal').css('display', 'none');
      });

      // ----------------------------- <설정 모달> ----------------------------

      // 개인정보 버튼 누를시
      $('.editPrivateInfo').on('click', function(){
         $('.editSettingModal').css('display', 'none');
         $('.editProfileInfoModal').css('display', 'block');
         $('.userInfoBoxModal').css('display', 'block');
      });

      // 차단된 계정 버튼 누를시
      $('.editBlockAccount').on('click', function(){
         $('.editSettingModal').css('display', 'none');
         $('.blockedAccountModal').css('display', 'block');
         $('.userInfoBoxModal').css('display', 'block');
      });

      // 전환 버튼 누를시
      $('.accountToggle img').on('click', function(){
         $('.accountStateModal').css('display', 'block');
         $('.userInfoBoxModal').css('display', 'block');
         $('.editSettingModal').css('display', 'none');
      });

      // 전환 여부 취소 버튼 누를시
      $('.cancelToChangeAccountState').on('click', function(){
         $('.accountStateModal').css('display', 'none');
         $('.userInfoBoxModal').css('display', 'block');
         $('.editSettingModal').css('display', 'block');
      });

      // 전환 결정 내릴시
      $('.submitToChangeAccountState').on('click', function(){
         var activateState = $('.accountToggle button').attr('activate');
         console.log("원래 activateState: " + activateState);

         var updatedActivateState = (activateState == 0) ? -1 : 0;
         console.log("업데이트된 activateState: " + updatedActivateState);

         $.ajax({
            url: 'openOrHideAccount',
            type: 'POST',
            data: {activate: updatedActivateState},
            success: function(data) {
               console.log('계정 상태 변경 성공:', data);
               // 활성화 상태에 따라 이미지 경로 설정
               if (data == 0) {
                   $('.accountToggle img').attr('src', '/imgs/toggleOff.png'); // 비공개 계정 Off
                   $('.accountStatus').text('공개 계정');
                   $('.accountToggle button').attr('activate', 0);
                   $('.askAboutOpinion').text('비공개 계정으로 전환하시겠어요?');
                   $('.submitToChangeAccountState').text('비공개로 전환');
                   $('.stateNote1').text('회원님의 팔로워만 회원님의 사진과 동영상을 볼 수 있습니다.');
                   $('.stateNote2').text('회원님을 팔로우하지 않는 사람을 태그할 수 없게 됩니다.');
                   $('.stateNote3').html('회원님에게 메시지를 보내거나 회원님을 태그 또는<br>@언급할 수 있는 사람은 변경되지 않습니다.');

               } else {
                   $('.accountToggle img').attr('src', '/imgs/toggleOn.png'); // 비공개 계정 On
                   $('.accountStatus').text('비공개 계정');
                   $('.accountToggle button').attr('activate', -1);
                   $('.askAboutOpinion').text('공개 계정으로 전환하시겠어요?');
                   $('.submitToChangeAccountState').text('공개로 전환');
                   $('.stateNote1').text('누구나 회원님의 게시물, 릴스를 볼 수 있습니다.');
                   $('.stateNote2').text('누구나 회원님에게 메시지를 보낼 수 있습니다.');
                   $('.stateNote3').text('누구나 회원님을 태그 또는 @언급할 수 있습니다.');
               }
               $('.editSettingModal').css('display', 'block');
               $('.userInfoBoxModal').css('display', 'block');
               $('.accountStateModal').css('display', 'none');
            },
            error: function(error) {
                console.error('Error changing your Account State:', error);
            }
         });
      });

      // ----------------------------- <차단 관리 모달> ----------------------------
      $('.backToEditSettingButton').on('click', function(){
         $('.blockedAccountModal').css('display', 'none');
         $('.editSettingModal').css('display', 'block');
         $('.userInfoBoxModal').css('display', 'block');
      });

      $('.closeEditBlockedUserModalButton').on('click', function(){
         $('.userInfoBoxModal').css('display', 'none');
         $('.blockedAccountModal').css('display', 'none');
      });

      $('.cancelToBlockUser').on('click', function(){
         var blockedUsername = $(this).closest('.blockedUserList').find('.blockedUsername').text();
         console.log("석방되는 유저:" + blockedUsername);
         var blockList = $('.blockList');
         console.log(blockList);
         var blockedUserList = $(this).closest('.blockedUserList');
         console.log(blockedUserList);
         $.ajax({
            url:'manageBlockedUsers',
            type: 'POST',
            data: {username: blockedUsername},
            success: function(data){
              var jsonData = JSON.stringify(data);
              console.log("새로운 블랙리스트: " + data);
              blockList.val(jsonData);
              console.log("새로운 블랙리스트 (JSON): " + jsonData);
              if(data.length == 0){
                $('.blockedUserList').html('<div class="noBlockedUser">차단한 사람이 없습니다.</div>');
              } else{
                blockedUserList.remove();
              }
            },
            error: function(error) {
                console.error('Error changing your blockedUserList:', error);
            }
         });
      });
});
