document.addEventListener("DOMContentLoaded", function() {
    const openModalImg1 = document.getElementById('openModalImg1');
    const closeModalBtn1 = document.getElementById('closeModalBtn1');
    const modal1 = document.getElementById('myModal1');

    openModalImg1.addEventListener('click', function() {
        showModal(modal1);
    });
    closeModalBtn1.addEventListener('click', function() {
        closeModal(modal1);
    });
    modal1.addEventListener('click', function(event) {
        closeModalOnBackground(event, modal1);
    });

    // 모달창 보이기
    function showModal(modalElement) {
        modalElement.style.display = 'block';
        $('body').css('overflow', 'hidden');
    }

    // 모달창 닫기
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        $('body').css('overflow', '');
    }

    // 배경 클릭 시 모달 닫기
    function closeModalOnBackground(event, modalElement) {
        if (event.target === modalElement || event.target === modalElement.querySelector('.modal-content1')) {
            closeModal(modalElement);
        }
    }
});
$(document).ready(function() {
    $('#shirinkedNavMenuButton, #dmNavMenuButton').on('click', function() {
        $('#myModal1').css('display', 'block');
    });
    $('#navModalLogout').on('click', function() {
        location.href = "../../../accounts/logout";
    });
});