/**
 * Created by xz on 2017/9/29.
 */
let sence = document.querySelector('.sence');
class snakeGame {
    constructor() {
        this.snake = ['1-0','2-0','3-0','4-0'];
        this.direction = 40;
        this.flag = {'1-0':true,'2-0':true,'3-0':true,'4-0':true};
        this.units = 1;
        this.grade = 0;
        this.flog = false;
    }
    start() {
        this.drowSnake();
        this.direct();
        this.move();
        this.setFood();
    }

    drowSnake() {
        let that =this;
        this.snake.forEach(value=>{
            document.getElementById(value).classList.add('green');
        })
    }
    clearAll() {
        let greens = document.querySelectorAll('.green');
        for(let i=0;i<greens.length;i++) {
            greens[i].classList.toggle('green');
        }
        let foodss = document.querySelectorAll('.food');
        for(let j=0;j<foodss.length;j++) {
            foodss[j].classList.toggle('food');
        }
    }
    unit() {
        this.grade += 1;
        document.querySelector('.grade').innerText = `分数：${this.grade}`;
        if(this.grade%5 == 0) {
            this.clearAll();
            this.units +=1;
            clearInterval(this.t);
            this.snake = ['1-0','2-0','3-0','4-0'];
            this.direction = 40;
            this.flag = {'1-0':true,'2-0':true,'3-0':true,'4-0':true};
            document.querySelector('.unit').innerText = `当前关卡：${this.units}`;
            this.start();
        }
    }
    direct() {
        let that = this;
        document.addEventListener('keydown',function(e){
            if(e.keyCode>36 && e.keyCode<41) {
                if(Math.abs(e.keyCode-that.direction) == 2) {
                    return;
                }
                that.direction = e.keyCode;
            }
        })
    }
    setFood() {
        let x = Math.floor(Math.random()*20);
        let y = Math.floor(Math.random()*20);
        this.foods = x + '-' + y;
        while(this.flag[this.foods]) {
            let x = Math.floor(Math.random()*20);
            let y = Math.floor(Math.random()*20);
            this.foods = x + '-' + y;
        }
        document.getElementById(this.foods).classList.add('food');
    }
    stop() {
        let lastone = this.snake[this.snake.length-1];
        let lastarr = lastone.split('-');
        if(this.flag[lastone]) {
            clearInterval(this.t);
        }
        if(lastarr[0]*1 < 0 || lastarr[0]*1 > 19 || lastarr[1]*1 < 0 || lastarr[1]*1 > 19) {
            clearInterval(this.t);
        }
    }
    upDateFlag() {
        this.flag = {};
        this.snake.forEach(value=>{
            this.flag[value] = true;
        })
    }
    move() {
        let that = this;
        this.t = setInterval(function(){
            let snakeHead = that.snake[that.snake.length-1].split('-');
            let wei = that.snake[0];
            for(let i=0;i<that.snake.length-1;i++) {
                that.snake[i] = that.snake[i+1];
            }
            that.snake.pop();
            switch(that.direction){
                case 37:that.snake.push(`${snakeHead[0]*1-1}-${snakeHead[1]}`);break;
                case 38:that.snake.push(`${snakeHead[0]}-${snakeHead[1]*1-1}`);break;
                case 39:that.snake.push(`${snakeHead[0]*1+1}-${snakeHead[1]}`);break;
                case 40:that.snake.push(`${snakeHead[0]}-${snakeHead[1]*1+1}`);break;
            }
            that.stop();
            if(that.flag[that.foods]) {
                document.getElementById(that.foods).classList.toggle('food');
                that.snake.unshift(wei);
                that.setFood();
                that.unit();
            }
            document.getElementById(wei).classList.remove('green');
            that.drowSnake();
            that.upDateFlag();
        },500-20*that.units)
    }
}
for(let j=0;j<20;j++) {
    for(let i=0;i<20;i++) {
        sence.innerHTML += `<div id="${i}-${j}"></div>`;
    }
}
let snake1 = new snakeGame();
snake1.start();