$(function () {
    class poke{
        constructor(){
            this.poke = [];
            this.cr = {};
        }
        /*create(){
            let color = ['c','d','h','s'];

            for(let i=0;i<color.length;i++){
                for(let j=1;j<14;j++){
                    this.poke.push({hua:color[i],num:j});
                }
            }

        }*/
        create(){
            let color = ['c','d','h','s'];
            let flag = {};
            while (this.poke.length<52){
                let hua = color[Math.floor(Math.random()*4)];
                let num = Math.floor(Math.random()*13+1);
                if(!flag[`${hua}-${num}`]){
                    this.poke.push({hua,num});
                    flag[`${hua}-${num}`] = true;
                }
            }
            console.log(this.poke);
        }
        licensing(){
            let index = 0;
            let start = 0;
            for(let i=0;i<7;i++){
                for(let j=0;j<i+1;j++){
                    $('<div></div>').addClass('card')
                        .css('background-image',`url("image/${this.poke[index]['hua']}${this.poke[index]['num']}.jpg")`)
                        .delay(i*20).animate({'top':60*i,'left':400-45*i+100*j,opacity:1})
                        .attr({'num':this.poke[index]['num'],'row':i}).prop('id',`${i}-${j}`).appendTo('.desk');
                    index++;
                }
            }
            start = index - 1;
            for(let i=0;index<this.poke.length;index++){
                $('<div>').addClass('card zuo').delay(120+i*10).animate({'top':520,'left':230,opacity:1})
                    .css('background-image',`url("image/${this.poke[index]['hua']}${this.poke[index]['num']}.jpg")`)
                    .attr('num',this.poke[index]['num']).appendTo('.desk');
                i++;
            }
        }
        judge(e){
            let coord = e.id.split('-');
            let coords = [`${coord[0]*1+1}-${coord[1]}`,`${coord[0]*1+1}-${coord[1]*1+1}`];
            if($(`#${coords[0]}`).length || $(`#${coords[1]}`).length){
                return false;
            }else {
                return true;
            }
        }
        play(){
            let that = this;
            let first = null,secend = null,fir = null,sec = null;
            $('.desk').on('click',function (e) {
                if (e.target.className.includes('card') && that.judge(e.target)) {
                if (!fir) {
                    fir = e.target;
                    first = $(e.target);
                    first.animate({'top': '-=10'}).css('box-shadow', '0 0 0 3px #795da3');
                } else {
                    if (fir !== e.target) {
                        sec = e.target;
                        secend = $(e.target);
                        secend.animate({'top': '-=10'}).css('box-shadow', '0 0 0 3px #795da3');
                        if (Number(first.attr('num')) + Number(secend.attr('num')) == 14) {
                            first.delay(50).animate({'top': 0, 'left': 400, 'opacity': 0}, function () {
                                first.remove();
                            });
                            secend.delay(50).animate({'top': 0, 'left': 400, 'opacity': 0}, function () {
                                secend.remove();
                            });
                            fir = null;
                        } else {
                            first.delay(50).animate({'top': '+=10'}).css('box-shadow', 'none');
                            secend.delay(50).animate({'top': '+=10'}).css('box-shadow', 'none');
                            fir = null;
                        }
                    } else {
                        first.animate({'top': '+=10'}).css('box-shadow', 'none');
                        fir = null;
                    }
                }
            }
            });
            let z = 0;
            $('.next').on('click',function () {
                $('.zuo').eq(-1).css({'z-index':z}).animate({'left':'+=310'}).removeClass('zuo').addClass('you');
                z++;
            });
            $('.pre').on('click',function () {
                z++;
                $('.you').eq(0).css({'z-index':z}).animate({'left':'-=310'}).removeClass('you').addClass('zuo');
            });
        }
    }
    let p = new poke();
    p.create();
    p.licensing();
    p.play();
})