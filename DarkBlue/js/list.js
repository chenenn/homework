$(function () {
    $('.all').click(function () {
        $('.choose-label>ul').slideToggle();
        if($(this)[0].innerText == '查看全部'){
            $(this).html('收起');
        }else {
            $(this).html('查看全部');
        }
    });
    $('.oths').on('click',function () {
        if($('span',this).text() == '+'){
            $('span',this).text('-');
        }else {
            $('span',this).text('+');
        }
        $(this).next('.oth').slideToggle();
    });
});