import { GetTime } from "./Time.js";


let enabledBtn=1;
const timeObj = new GetTime('2024-07-30T20:30:00');


//helper functions
function collapse() {
    $('#side-nav').css('left', `-${$('#side-nav ul').outerWidth()}px`);
    $('#expand-side').fadeIn(200);
}
function disableBtn() {
    $('#send-btn').addClass('cursor-not-allowed bg-red-300');
    $('#send-btn').removeClass('bg-red-600 hover:bg-red-500 cursor-pointer');
}
function enableBtn() {
    $('#send-btn').removeClass('cursor-not-allowed bg-red-300');
    $('#send-btn').addClass('bg-red-600 hover:bg-red-500 cursor-pointer');
}


//initial collapse
$(document).ready(function () {
    collapse();
    $('#details p').slideUp(500);
});


//side menu
$(window).resize(collapse);
$('.nav-item').click(function (e) {
    $('html,body').animate({ scrollTop: $($(this).attr('target')).offset().top }, 1000);
    collapse();
});
$('#close').click(collapse);
$('#expand-side').click(function (e) {
    $('#side-nav').css('left', '0px');
    $('#expand-side').fadeOut(200);
});


//details section
$('#details h1').click(function (e) {
    $(`#details p:not(${$(this).attr('target')})`).slideUp(500);
    $($(this).attr('target')).slideToggle(500);
});


//input validation
$('textarea').on('input', function (e) {
    const len = 256;
    let s = $('textarea').val();
    $('#cnt').html(s.length);
    if (s.length > len && enabledBtn) {
        enabledBtn=0;
        disableBtn();
        $('textarea').removeClass('focus-visible:outline-blue-700 outline-stone-800');
        $('textarea').addClass('outline-red-700');
        $('#cnt-box').addClass('text-red-700');
    }
    else if (s.length <= len && !enabledBtn) {
        enabledBtn=1;
        enableBtn();
        $('textarea').addClass('focus-visible:outline-blue-700 outline-stone-800');
        $('textarea').removeClass('outline-red-700');
        $('#cnt-box').removeClass('text-red-700');
    }
});


//timer
const myInterval = setInterval(function(){
    let t = timeObj.getDiff();
    $('#days').html(t.day);
    $('#hours').html(t.hour);
    $('#minutes').html(t.minute);
    $('#seconds').html(t.second);
    $('#time-msg').html(t.msg);
    if(t.done) clearInterval(myInterval);
},1000);