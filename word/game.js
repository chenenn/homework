/**
 * Created by xz on 2017/9/28.
 */
window.onload = function() {
    let body = document.querySelector('body');
    let p = document.querySelector('p');
    let span = document.querySelector('span');
    class games {
        constructor() {
            this.charArr = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
            this.count = [];
            this.countchar = [];
            this.position = [];
            this.number = 5;
            this.speed = 10;
            this.units=1;
            this.nums = 1;
            this.hps = 10;
        }
        getChars() {
            for(let i=0;i<this.number;i++) {
                this.getChar();
            }
        }
        getChar() {
            let char = this.charArr[Math.floor(Math.random()*this.charArr.length)];
            while(this.countchar.includes(char)) {
                char = this.charArr[Math.floor(Math.random()*this.charArr.length)];
            }
            let divs = document.createElement('div');
            divs.innerText = char;
            this.countchar.push(char);
            this.count.push(divs);
            body.appendChild(divs);
            divs.style.top = `${-Math.random()*100}px`;
            let lefts = Math.random()*(innerWidth-100);
            while(this.norepeat(lefts)) {
                lefts = Math.random()*(innerWidth-100);
                console.log(1);
            }
            this.position.push(lefts);
            divs.style.left = `${lefts}px`;
        }
        norepeat(lefts) {
            for(let i=0;i<this.position.length;i++){
                if(Math.abs(this.position[i]-lefts) < 60) {
                    return true;
                }
            }
            return false;
        }
        drop(){
            let that = this;
            this.t = setInterval(function(){
                that.count.forEach((value,index)=>{
                    value.style.top = `${value.offsetTop+that.speed*that.units}px`;
                    if(value.offsetTop >= 500) {
                        that.count.splice(index,1);
                        body.removeChild(value);
                        that.position.splice(index,1);
                        that.countchar.splice(index,1);
                        that.getChar();
                        that.hp();
                    }
                })
                console.log(1);
            },500);
        }
        key() {
            let that = this;
            document.addEventListener('keydown',function(e){
                that.count.forEach((value,index)=>{
                   if(value.innerText.charCodeAt() == e.keyCode) {
                       that.count.splice(index,1);
                       body.removeChild(value);
                       that.position.splice(index,1);
                       that.countchar.splice(index,1);
                       that.getChar();
                       that.unit();
                   }
                })
            })
        }
        unit() {
            this.nums += 1;
            if(this.nums == 5) {
                this.units +=1;
                this.nums = 1;
            }
            p.innerText = `当前关卡：${this.units}`;
        }
        hp() {
            this.hps -= 1;
            span.innerText = `当前血量：${this.hps}`;
            if(this.hps == 0) {
                clearInterval(this.t);
                this.count.forEach(value=>{
                    body.removeChild(value);
                })
                this.count = [];
                this.position = [];
                this.number = 5;
                this.speed = 10;
                this.units=1;
                this.nums = 1;
                this.hps = 10;
                span.innerText = `当前血量：${this.hps}`;
                this.startGame();
            }
        }

        startGame() {
            this.getChars();
            this.drop();
            this.key();
        }
    }
    let game = new games();
    game.startGame();
}