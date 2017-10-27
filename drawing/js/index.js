window.onload = function () {
    class drawing {
        constructor(){
        this.canvas = canvas;
        this.canvass = canvass;
        this.ctx = this.canvass.getContext('2d');
        this.hisarr = [];
        this.type = 'solid';
        /*裁剪*/
        this.cut = null;
        }
        style(type){
            this.type = type;
        }
        style1(type){
            if(type == 'dashed'){
                this.ctx.setLineDash([1,1]);
            }else{
                this.ctx.setLineDash([0,0]);
            }
        }
        style2(type){
            if(type == 'solid' || type == 'dashed'){
                this.ctx.strokeStyle = colors;
                this.ctx.stroke();
            }
            if(type == 'fill') {
                this.ctx.fillStyle = colors;
                this.ctx.fill();
            }
        }
        line(cx,cy,ox,oy) {
            this.ctx.beginPath();
            this.ctx.moveTo(cx,cy);
            this.ctx.lineTo(ox,oy);
            this.style2(this.type);
        }
        circular(cx,cy,ox,oy){
            let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
            //this.style1(this.type);
            this.ctx.beginPath();
            this.ctx.arc(cx,cy,r,0,2*Math.PI);
            this.ctx.closePath();
            this.style2(this.type);
        }
        /*铅笔*/
        pencil(cx,cy,ox,oy){
            this.ctx.lineTo(ox,oy);
            this.ctx.stroke();
        }
        /*边形*/
        polygon(cx,cy,ox,oy,n){
            let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
            this.ctx.beginPath();
            this.ctx.moveTo(cx+r,cy);
            for(let i=1;i<=n;i++) {
                let x = cx + r*Math.cos(i*2*Math.PI/n);
                let y = cy + r*Math.sin(i*2*Math.PI/n);
                this.ctx.lineTo(x,y);
            }
            this.style2(this.type);
        }
        /*星形*/
        starlike(cx,cy,ox,oy,n){
            let r = Math.sqrt(Math.pow(ox-cx,2) + Math.pow(oy-cy,2));
            this.ctx.beginPath();
            this.ctx.moveTo(cx+r,cy);
            for(let i=1;i<=2*n;i++) {
                let r1 = i%2 ? r/2.5 : r;
                let x = cx + r1*Math.cos(i*Math.PI/n);
                let y = cy + r1*Math.sin(i*Math.PI/n);
                this.ctx.lineTo(x,y);
            }
            this.style2(this.type);
        }
        /*橡皮*/
        eraser(ontop) {
            this.canvas.onmousedown = function () {
                if(this.hisarr.length){
                    this.repaint();
                }
                ontop.style.display = 'block';
                this.canvas.onmousemove = function (e) {
                    let ex = e.offsetX - 20, ey = e.offsetY - 20;
                    ex = ex < 0 ? 0 : ex;
                    ey = ey < 0 ? 0 : ey;
                    ex = ex > 1160 ? 1160 : ex;
                    ey = ey > 476 ? 476 : ey;
                    ontop.style.left = `${ex}px`;
                    ontop.style.top = `${ey}px`;
                    this.ctx.clearRect(ex, ey, 40, 40);
                }.bind(this)
                this.canvas.onmouseup = function () {
                    this.canvas.onmousemove = null;
                    this.save();
                    ontop.style.display = 'none';
                }.bind(this)
            }.bind(this)
        }
        paint(type,n) {
            this.canvas.onmousedown = function (e) {
                let cx = e.offsetX,
                    cy = e.offsetY;
                this.style1(this.type);
                this.ctx.moveTo(cx,cy);
                this.canvas.onmousemove = function (e) {
                    let ox = e.offsetX,
                        oy = e.offsetY;
                    this.clear();
                    this.repaint();
                    if(type == 'starlike'){
                        n = anglenum;
                    }
                    if(type == 'polygon'){
                        n = sidenum;
                    }
                    this[type](cx,cy,ox,oy,n);
                }.bind(this)
            }.bind(this)
            this.canvas.onmouseup = function () {
                this.canvas.onmousemove = null;
                this.save();
            }.bind(this)
        }
        /*文字*/
        inputText(textbox){
            this.canvas.onmousedown = function (e) {
                if(this.hisarr.length){
                    this.repaint();
                }
                textbox.style['z-index'] = 10;
                if(textbox.style.display != 'block'){
                    textbox.style.display = 'block';
                    let cx = e.offsetX, cy = e.offsetY;
                    textbox.style.left = `${cx}px`;
                    textbox.style.top = `${cy}px`;
            }
        }.bind(this)
            textbox.onmousedown = function (e) {
                let w = textbox.offsetWidth,h = textbox.offsetHeight;
                /*let x = e.offsetX,y = e.offsetY;
                if( (x>0 && x<20) || (x>w-20 && x<w) || (y>0 && y<20) || (y>h-20 && y<h) ){*/
                    let cx = textbox.offsetLeft,cy = textbox.offsetTop;
                    let fx = e.clientX, fy = e.clientY;
                    textbox.onmousemove = function (e) {
                        let ex = e.clientX-fx+cx, ey = e.clientY-fy+cy;
                        //console.log(e.clientX,e.offsetX,ex);
                        ex = ex < 0 ? 0 : ex;
                        ey = ey < 0 ? 0 : ey;
                        ex = ex > canvass.offsetWidth-w ? canvass.offsetWidth-w : ex;
                        ey = ey > canvass.offsetHeight-h ? canvass.offsetHeight-h : ey;
                        textbox.style.left = `${ex}px`;
                        textbox.style.top = `${ey}px`;
                    }.bind(this)
                }
            /*}*/
            textbox.onmouseup = function () {
                textbox.onmousemove = null;
            }.bind(this)
            textbox.onblur = function () {
                this.style1(this.type);
                this.ctx.font = `${fontnum}px 微软雅黑`;
                if(this.type == 'solid' || this.type == 'dashed'){
                    this.ctx.strokeStyle = colors;
                    this.ctx.strokeText(textbox.innerText,textbox.offsetLeft,textbox.offsetTop+fontnum);
                }
                if(this.type == 'fill'){
                    this.ctx.fillStyle = colors;
                    this.ctx.fillText(textbox.innerText,textbox.offsetLeft,textbox.offsetTop+fontnum);
                }
                console.log(1);
                this.save();
                textbox.style.display = 'none';
            }.bind(this)
        }
        /*裁剪*/
        tailor(region){
            let minX,minY,w,h;
            this.canvas.onmousedown = function (e) {
                region.style.display = 'block';
                let cx = e.offsetX,cy = e.offsetY;
                this.canvas.onmousemove = function (e) {
                    let ox = e.offsetX,oy = e.offsetY;
                    w = Math.abs(cx - ox);
                    h = Math.abs(cy - oy);
                    minX = ox<cx ? ox : cx;
                    minY = oy<cy ? oy : cy;
                    region.style.left = `${minX}px`;
                    region.style.top = `${minY}px`;
                    region.style.width = `${w}px`;
                    region.style.height = `${h}px`;
                }.bind(this)
            }.bind(this)
            this.canvas.onmouseup = function () {
                region.style['z-index'] = 11;
                this.canvas.onmousemove = null;
                this.cut = this.ctx.getImageData(minX,minY,w,h);
                this.ctx.clearRect(minX,minY,w,h);
                this.save();
                this.ctx.putImageData(this.cut,minX,minY);
                drop();
            }.bind(this)
            let drop = function () {
                region.onmousedown = function (e) {
                    let fx = e.clientX, fy = e.clientY;
                    region.onmousemove = function (e) {
                        let ex = e.clientX-fx+minX, ey = e.clientY-fy+minY;
                        ex = ex < 0 ? 0 : ex;
                        ey = ey < 0 ? 0 : ey;
                        ex = ex > canvass.offsetWidth-w ? canvass.offsetWidth-w : ex;
                        ey = ey > canvass.offsetHeight-h ? canvass.offsetHeight-h : ey;
                        region.style.left = `${ex}px`;
                        region.style.top = `${ey}px`;
                        this.clear();
                        this.repaint();
                        this.ctx.putImageData(this.cut,ex,ey);
                    }.bind(this)
                }.bind(this)
                region.onmouseup = function () {
                    this.save();
                    region.onmousemove = null;
                    region.style.display = 'none';
                }.bind(this)
            }.bind(this)
        }
        revoke(){
            if(this.hisarr.length){
                this.hisarr.pop();
                if(!this.hisarr.length){
                    this.clear();
                }else{
                    this.ctx.putImageData(this.hisarr[this.hisarr.length-1],0,0);
                }
            }
        }
        clear(){
            this.ctx.clearRect(0,0,this.canvass.width,this.canvass.height);
        }
        save(){
            this.hisarr.push(this.ctx.getImageData(0,0,this.canvass.width,this.canvass.height));
        }
        repaint(){
            if(this.hisarr.length){
                this.ctx.putImageData(this.hisarr[this.hisarr.length-1],0,0);
            }
        }
    }
    let canvass = document.querySelector('canvas');
    let top = document.querySelector('.top');
    canvass.width = top.offsetWidth;
    canvass.height = top.offsetHeight;
    let btn = document.querySelectorAll('.left>ul>li');
    let textbox = document.querySelector('#textbox');
    let revoke = document.querySelector('.revoke');
    let down = document.querySelector('.save');
    let canvas = document.querySelector('.opa');
    let side = document.querySelector('.side');
    let angle = document.querySelector('.angle');
    let color = document.querySelector('#color');
    let font = document.querySelector('.font');
    let fontnum = 30;
    let sidenum = 5;
    let anglenum = 5;
    let colors = '#000000';
    let dw = new drawing(canvass);
    color.onblur = function () {
        colors = color.value;
    }
    font.onblur = function () {
        let num = font.value*1;
        if(typeof(num) == "number"){
            fontnum = num;
        }
    }
    side.onblur = function () {
        let num = side.value*1;
        if(typeof(num) == "number"){
            sidenum = num;
        }
    }
    angle.onblur = function () {
        let num = angle.value*1;
        if(typeof(num) == "number"){
            anglenum = num;
        }
    }
    down.onclick = function(){
        let data = canvass.toDataURL('image/png');
        down.href = data;
        down.download = 'tu.png';
    }
    for(let i=0;i<8;i++) {
        let types = btn[i].id;
        btn[i].onclick = function () {
            if(i<5){
                dw.paint(types);
            }
            if(i==5){
                let ontop = document.querySelector('.ontop');
                dw.eraser(ontop);
            }
            if(i==6){
                dw.inputText(textbox);
            }
            if(i==7){
                let region = document.querySelector('.tailor');
                dw.tailor(region);
            }
            for(let j=0;j<8;j++) {
                btn[j].style.background = '#fff';
            }
            btn[i].style.background = '#eee';
        }
    }
    for(let i=8;i<btn.length-1;i++){
        let type = btn[i].id;
        btn[i].onclick = function () {
            dw.style(type);
            for(let j=8;j<btn.length-1;j++) {
                btn[j].style.background = '#fff';
            }
            btn[i].style.background = '#eee';
        }
    }
    revoke.onclick = function () {
        dw.revoke();
    }

}