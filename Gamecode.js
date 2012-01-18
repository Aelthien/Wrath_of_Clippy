var fox;
var villain;
var hp;
var lives;
var exit;

var currentLives;
var foxHor = 3;
var foxVert = 560;
var timer;


function init(){
	fox = document.getElementById('fox');
	hp = document.getElementById('hp');
	lives = document.getElementById('lives');
	villain = document.getElementById('villain');
	exit = document.getElementById('exit');
	document.onkeydown = keyListener;
	start();
	}

function keyListener(e){
	if(!e){
		e = window.event;
	}
	if(e.keyCode==65 && foxHor > 3){
		foxHor -= 10;
		fox.style.left = foxHor + 'px';
	}
	if(e.keyCode==68 && foxHor < 772){
		foxHor += 10;
		fox.style.left = foxHor + 'px';
	}
	if(e.keyCode==87 && foxVert > 25){
		foxVert -= 10;
		fox.style.top = foxVert + 'px';
	}
	if(e.keyCode==83 && foxVert < 557){
		foxVert += 10;
		fox.style.top = foxVert + 'px';
}

function start(){
	detectCollisions();
	render();
	difficulty();
	
	if(lives > 0 ){
		timer = setTimeout('start()',50);
	}
	else{
		gameOver();
	}
}
}