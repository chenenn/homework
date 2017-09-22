window.onload = function() {
	function getclass(cname,ranger) {
			ranger = ranger ? ranger : document;
			if(ranger.getElementsByClassName(cname)) {
				return ranger.getElementsByClassName(cname);
			}else{
				let all = ranger.getElementsByTagName('*');
				let newarr = [];
				for(let i=0;i<all.length;i++) {
					if(checkClass(all[i].className,cname)) {
						newarr.push(all[i]);
					}
				}
				return newarr;
			}
		}
		function checkClass(cName,cname) {
			let arr = cName.split(' ');
			for(let i=0;i<arr.length;i++) {
				if(arr[i] == cname) {
					return true;
				}
			}
			return false;
		}
		
		function $(select,ranger) {
			ranger = ranger ? ranger : document;
			let first = select.charAt(0);
			if(first == '.') {
				return getclass(select.substring(1),ranger);
			}else if(first == '#') {
				return ranger.getElementById(select.substring(1));
			}else if(/^[a-z][a-z1-6]{0,7}$/.test(select)) {
				return ranger.getElementsByTagName(select);
			}
		}
	let lis = document.getElementsByClassName('liss')[0];
	let ds = document.getElementsByClassName('dss')[0];
	let lim = lis.getElementsByTagName('li');
	let lid = ds.getElementsByTagName('li');
	let menuimg = $('.menu-img')[0];
	let lbtn = $('.left-btn')[0];
	let rbtn = $('.right-btn')[0];
	let imgw = parseInt(getComputedStyle(lis,null).width);
	let now = 0;
	let next = 0;
	let flag = true;
	function move() {
		next = now+1;
		if(next == lim.length) {
			next = 0;
		}
		lim[next].style.left = `${imgw}px`;
		animate(lim[now],{left:-imgw});
		animate(lim[next],{left:0},function(){
			flag = true;
		});
		for(let j=0;j<lid.length;j++) {
				lid[j].style = '';
			}
		lid[next].style.background = 'gray';
		lid[next].style.border = '2px solid #122';
		now = next;
	}
	function movel() {
		next = now-1;
		if(next < 0) {
			next = lim.length-1;
		}
		lim[next].style.left = `${-imgw}px`;
		animate(lim[now],{left:imgw});
		animate(lim[next],{left:0},function(){
			flag = true;
		});
		for(let j=0;j<lid.length;j++) {
				lid[j].style = '';
			}
		lid[now].style.background = 'gray';
		lid[now].style.border = '2px solid #122';
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
			lid[i].style.border = '2px solid #122';
			
		}
	}
	/*for(let i=0;i<lid.length;i++) {
		lid[i].onclick = function() {
			for(let j=0;j<lid.length;j++) {
				animate(lim[j],{opacity:0});
				lim[j].style['z-index'] = 0;
				lid[j].style = '';
			}
			animate(lim[i],{opacity:1});
			lim[i].style['z-index'] = 2;
			lid[i].style.background = 'gray';
			lid[i].style.border = '2px solid #122';
			now = i;
		}
	}
	function move() {
		now++;
		if(now == lid.length) {
			now = 0;
		}
		for(let j=0;j<lid.length;j++) {
				animate(lim[j],{opacity:0});
				lim[j].style['z-index'] = 0;
				lid[j].style = '';
			}
		animate(lim[now],{opacity:1});
		lim[now].style['z-index'] = 2;
		lid[now].style.background = 'gray';
		lid[now].style.border = '2px solid #122';
	}
	function movel() {
		now--;
		if(now < 0) {
			now = lid.length-1;
		}
		for(let j=0;j<lid.length;j++) {
				animate(lim[j],{opacity:0});
				lim[j].style['z-index'] = 0;
				lid[j].style = '';
			}
		animate(lim[now],{opacity:1});
		lim[now].style['z-index'] = 2;
		lid[now].style.background = 'gray';
		lid[now].style.border = '2px solid #122';
	}*/
	t = setInterval(move,3000);
	menuimg.onmouseover = function() {
		clearInterval(t);
	}
	menuimg.onmouseout = function() {
		t = setInterval(move,3000);
	}
	lbtn.onclick = function() {
		if(!flag) {
			return;
		}
		movel();
		flag = false;
	}
	rbtn.onclick = function() {
		if(!flag) {
			return;
		}
		move();
		flag = false;
	}

	let lbtn1 = document.querySelector('.l-btn');
	let rbtn1 = document.querySelector('.r-btn');
	let ul1 = document.querySelector('.goods ul');
	lbtn1.onclick = function() {
		ul1.style.left = '-100%';
	}
	rbtn1.onclick = function() {
		ul1.style.left = 0;
	}
	let lbtn2 = document.querySelector('.l-btn2');
	let rbtn2 = document.querySelector('.r-btn2');
	let ul2 = document.querySelector('.ull');
	lbtn2.onclick = function() {
		ul2.style.left = '-100%';
	}
	rbtn2.onclick = function() {
		ul2.style.left = 0;
	}
}
