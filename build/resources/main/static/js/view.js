$(document).ready(function() {
    let slider = $(".boardModalSlider").bxSlider({
        touchEnabled : (navigator.maxTouchPoints > 0),
        infiniteLoop: false,
        hideControlOnEnd: true,
    });
});