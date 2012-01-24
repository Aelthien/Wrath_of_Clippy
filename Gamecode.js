var fox;
var clippy;
var hp;
var lives;
var exit;

var currentLives;
var h = 3;
var v = 557;
var ticks = 0;
var jumpedAt = 0;
var leftEdge = 3;
var rightEdge = 772;
var topEdge = 25;
var bottomEdge = 557;
var isJumping = false;

function init(){
	fox = document.getElementById('fox');
	hp = document.getElementById('hp');
	lives = document.getElementById('lives');
	clippy = document.getElementById('clippy');
	exit = document.getElementById('exit');
	document.onkeydown = keyListener;
	start();
	}

function keyListener(e){
	if(!e){
		e = window.event;
	}
	//move right
	if(e.keyCode===68){
		if(h < rightEdge){
		h += 10;
		fox.style.left = h + 'px';
		}
	}
	//move left
	if(e.keyCode===65){
		if(h > leftEdge){
		h -= 10;
		fox.style.left = h + 'px';
		}
	}
	//jump
	if(e.keyCode===32){
		if(v === bottomEdge){
	isJumping = true;
	jumpedAt = ticks;
	v -= 10;
	fox.style.top = v + 'px';
	}
	}
}

function start(){
	ticks += 1;
	setTimeout(function(){
		//if not jumping and inAir then fall
		if(inAir === false)
			if(v < topEdge){
			v += 5;
			fox.style.top = v + 'px';
		}
		if(isJumping){
			jumpPos = ticks - jumpedAt;
			if(jumpPos >= jumpLength){
				isJumping = false;			
			}else{
				v -= 10;
				fox.style.top = v + 'px';
			}	
		}
		start();
},300);
	}