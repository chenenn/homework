$(function () {
    let next;
    function move(obj,dir) {
        $('.active').addClass(dir).delay(500).queue(function () {
            $(this).removeClass(dir).removeClass('active');
            $(this).dequeue();
        })
        let dir1 = dir=='left' ? 'right' : 'left';
        console.log(dir,dir1);
        next.addClass(dir1).addClass('active');
        next[0].offsetHeight;
        next.removeClass(dir1);
    }


    setInterval(function () {
        next = $('.active').next('li')
        if(!next.length){
            next = $('.banner > ul >li').eq(0);
        }
        move(next,'left');
    },3000)

})