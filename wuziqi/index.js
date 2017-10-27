$(function () {
    let index = 0;
    let hei = {};
    let bai = {};
    let postion = {x:0,y:0};
    for(let i=0;i<20;i++){
        $('<span>').addClass('heng').appendTo('.box');
        $('<i>').addClass('shu').appendTo('.box');
        for(let j=0;j<20;j++){
            $('<li>').addClass('qizi').attr({'x':j,'y':i,'id':`${j}-${i}`}).appendTo('.box>ul');
        }
    }
    $('.qizi').on('click',function () {
        let ele = $(this);
        if(ele.hasClass('hei') || ele.hasClass('bai')){
            return;
        }
        postion.x = ele.attr('x')*1;
        postion.y = ele.attr('y')*1;
        if(index%2){
            ele.addClass('hei');
            hei[ele.attr('id')]=true;
            if(judge(postion,hei) >=5){
                console.log('黑棋赢');
                $('.qizi').off();
            };
        }else {
            ele.addClass('bai');
            bai[ele.attr('id')]=true;
            if(judge(postion,bai) >=5){
                console.log('白棋赢');
                $('.qizi').off();
            };
        }
        index++;
        if(index%2){
            ai(postion,bai);
        }

    })
    //判断
    function judge(pos,obj) {
        let rows=1,cols=1,lefts=1,rights=1;
        let x,y;
        //横
        x=pos.x+1,y=pos.y;
        while (obj[`${x}-${y}`]){
            rows++;
            x++;
        }
        x=pos.x-1;
        while (obj[`${x}-${y}`]){
            rows++;
            x--;
        }
        //竖
        x=pos.x,y=pos.y+1;
        while (obj[`${x}-${y}`]){
            cols++;
            y++;
        }
        y=pos.y-1;
        while (obj[`${x}-${y}`]){
            cols++;
            y--;
        }
        //左斜
        x=pos.x+1,y=pos.y-1;
        while (obj[`${x}-${y}`]){
            lefts++;
            x++;
            y--;
        }
        x=pos.x-1,y=pos.y+1;
        while (obj[`${x}-${y}`]){
            lefts++;
            x--;
            y++;
        }
        //右斜
        x=pos.x+1,y=pos.y+1;
        while (obj[`${x}-${y}`]){
            rights++;
            x++;
            y++;
        }
        x=pos.x-1,y=pos.y-1;
        while (obj[`${x}-${y}`]){
            rights++;
            x--;
            y--;
        }
        return Math.max(rows,cols,lefts,rights);
    }
    function ai(pos,obj) {
        let rows=1,cols=1,lefts=1,rights=1;
        let row=[],col=[],left=[],right=[];
        let x,y;
        //横
        x=pos.x+1,y=pos.y;
        while (obj[`${x}-${y}`]){
            rows++;
            x++;
        }
        row.push(x);
        row.push(y);
        x=pos.x-1;
        while (obj[`${x}-${y}`]){
            rows++;
            x--;
        }
        row.push(x);
        row.push(y);
        //竖
        x=pos.x,y=pos.y+1;
        while (obj[`${x}-${y}`]){
            cols++;
            y++;
        }
        col.push(x);
        col.push(y);
        y=pos.y-1;
        while (obj[`${x}-${y}`]){
            cols++;
            y--;
        }
        col.push(x);
        col.push(y);
        //左斜
        x=pos.x+1,y=pos.y-1;
        while (obj[`${x}-${y}`]){
            lefts++;
            x++;
            y--;
        }
        left.push(x);
        left.push(y);
        x=pos.x-1,y=pos.y+1;
        while (obj[`${x}-${y}`]){
            lefts++;
            x--;
            y++;
        }
        left.push(x);
        left.push(y);
        //右斜
        x=pos.x+1,y=pos.y+1;
        while (obj[`${x}-${y}`]){
            rights++;
            x++;
            y++;
        }
        right.push(x);
        right.push(y);
        x=pos.x-1,y=pos.y-1;
        while (obj[`${x}-${y}`]){
            rights++;
            x--;
            y--;
        }
        right.push(x);
        right.push(y);
        let max = Math.max(rows,cols,lefts,rights);
        if(rows == max){
            aiJudge(row[0],row[1],row[2],row[3],max);
            return;
        }
        if(cols == max){
            aiJudge(col[0],col[1],col[2],col[3],max);
            return;
        }
        if(lefts == max){
            aiJudge(left[0],left[1],left[2],left[3],max);
            return;
        }
        if(rights == max){
            aiJudge(right[0],right[1],right[2],right[3],max);
            return;
        }
    }
    function aiJudge(x1,y1,x2,y2,dir) {
        if(JSON.stringify(hei) == '{}'){
            $(`#${x1}-${y1}`).triggerHandler('click');
        }else if(dir<3){
            $(`#${checkValue()[1]}`).triggerHandler('click');
        }else{
            let next = checkValue();
            if(next[0]==5){
                $(`#${next[1]}`).triggerHandler('click');
            }else if(!hei[`${x1}-${y1}`]){
                $(`#${x1}-${y1}`).triggerHandler('click');
                return;
            }else if(!hei[`${x2}-${y2}`]){
                $(`#${x2}-${y2}`).triggerHandler('click');
                return;
            }else{
                $(`#${next[1]}`).triggerHandler('click');
            }
        }

        function checkValue(){
            let results = {};
            let value;
            for(let i=0;i<20;i++){
                for(let j=0;j<20;j++){
                    let nowid = `${j}-${i}`;
                    if(!(hei[nowid] || bai[nowid])){
                        postion.x=j,postion.y=i;
                        value = judge(postion,hei)+'';
                        if(!results[value]){
                            results[value] = [];
                        }
                        results[value].push(nowid);
                    }
                }
            }
            let max = 0;
            for(let i in results){
                if(max < (i*1)){
                    max = i*1;
                }
            }
            let id = results[max+''][0];
            return [max,id];
        }

    }
})