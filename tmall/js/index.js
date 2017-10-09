window.onload = function() {
	let ban = $('.banner')[0];
	let banner = document.getElementsByClassName('banner-image')[0];
	let ul = banner.getElementsByTagName('ul');
	let lim = ul[0].getElementsByTagName('li');
	let lid = ul[1].getElementsByTagName('li');
	let imgw = parseInt(getComputedStyle(banner,null).width);
	let color = ['#E8E8E8','#6F3F33','#E42E20','#8023C9','#8F020A','#E8E8E8'];
	let now = 0;
	let next = 0;
	function move() {
		next = now+1;
		if(next == lim.length) {
			next = 0;
		}
		lim[next].style.left = `${imgw}px`;
		animate(lim[now],{left:-imgw});
		animate(lim[next],{left:0});
		for(let j=0;j<lid.length;j++) {
				lid[j].style = '';
			}
		lid[next].style.background = 'gray';
		ban.style.background = color[next];
		now = next;
	}
	for(let i=0;i<lid.length;i++) {
		lid[i].onclick = function() {
			if(now == i){
				return;
			}
			if(now>i) {
				lim[i].style.left = `${-imgw}px`;
				animate(lim[now],{left:imgw});
				animate(lim[i],{left:0});
				now = i;
			}else{
				lim[i].style.left = `${imgw}px`;
				animate(lim[now],{left:-imgw});
				animate(lim[i],{left:0});
				now = i;
			}
			for(let j=0;j<lid.length;j++) {
				lid[j].style = '';
			}
			lid[i].style.background = 'gray';
			ban.style.background = color[now];
		}
	}
	t = setInterval(move,5000);
	banner.onmouseover = function() {
		clearInterval(t);
	}
	banner.onmouseout = function() {
		t = setInterval(move,5000);
	}
	let fixtop = document.querySelector('.fixtop');
	let flag = true;
	window.onscroll = function() {
		let nowtop = document.body.scrollTop;
		if(nowtop>=800) {
			if(flag) {
				flag = !flag;
				console.log(1);
				fixtop.style.top = 0;
				//fixtop.style.transform = 'translateY(0)';
				//animate(fixtop.style,{top:0});
			}
		}
		if(nowtop<800) {
			if(!flag) {
				flag = !flag;
				fixtop.style.top = '-50px';
				//fixtop.style.transform = 'translateY(-50px)';
				//animate(fixtop.style,{top:'-50px'});
			}
		}
	}
}