var fox;
var clippy;
var arrow;
var bomb;
var hp;
var lives;
var exit;
var position;
var currentLives;

var h = 3; //Player's horizontal position
var v = 500; //Players vertical position
var cH = 0; //Clippy's horizontal position
var cV = 20; //Clippy's vertical position
var aH = 11;
var aV = 480;
var bH = 700;
var bV = 540;
var leftEdge = 3; //Left boundary of the game area
var rightEdge = 772; //Right boundary of the game area
var topEdge = 26; //Top boundary of the game area
var bottomEdge = 558; //Bottom boundary of the game
var gravity = 3; //How many pixels the player moves with gravity
var jump = 3; //How many pixels something moves per tick when jumping
var move = 6; //Player move Left(-) Right(+)
var cMove = 3; //Clippy move Left(-) Right(+) Must be an odd number
var ticks = 0;
var jumpedAt = 0;
var jumpLength = 30; //The length of a jump in ticks
var isJumping = false;
var clippyDir = false;
var isShooting = false;
var movingRight = false;
var movingLeft = false;
var bombDrop = false;

function init(){
	fox = document.getElementById('fox');
	hp = document.getElementById('hp');
	arrow = document.getElementById('arrow');
	bomb = document.getElementById('bomb');
	lives = document.getElementById('lives');
	clippy = document.getElementById('clippy');
	exit = document.getElementById('exit');
	position = document.getElementById('position');
	arrow.style.visibility = 'hidden';
	bomb.style.visibility = 'visible';
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;
	start();
}

function keyDown(evt){
	//move right
	if(evt.keyCode===68){
		if(h < rightEdge){
			movingRight = true;
		}
	}
	//move left
	if(evt.keyCode===65){
		if(h > leftEdge){
			movingLeft = true;
		}
	}
	//jump
	if(evt.keyCode===32){
		if(!inAir()){
			isJumping = true;
			jumpedAt = ticks;
		}
	}
	if(evt.keyCode===66){
		bombDrop = true;
		bV = cV;
		bH = cH;
		bomb.style.top = cV;
		bomb.style.left = cH;
		bomb.style.visibility = 'visible';
	}
	if(evt.keyCode===90){
		if(isShooting === false){
			isShooting = true;
			aV = v - 20;
			aH = h + 8;
			arrow.style.top = aV;
			arrow.style.left = aH;
			arrow.style.visibility = 'visible';
		}		
	}
}

function keyUp(evt){
	if(evt.keyCode===68){
		movingRight = false;
	}
	if(evt.keyCode===65){
		movingLeft = false;
	}
}

function inAir(){
	return(v <= bottomEdge);
}

function start(){
	debug = ' V: ' + v + ' H: ' + h + ' CH: ' + cH + ' AV: ' + aV + ' bH: ' + bH;
	debug += ' Jumping = ' + isJumping + ' Shooting = ' + isShooting;
	position.innerHTML = 'Debug' + debug;
	ticks += 1;
	setTimeout(function(){
		//if jumping move up
		if(isJumping === true){
			v -= jump;
			fox.style.top = v + 'px';
			jumpPos = ticks - jumpedAt;
			if(jumpPos >= jumpLength){
				isJumping = false;
			}
		}
		//if not jumping is he touching the ground? if he is not, fall.
		if(isJumping === false){
			if(inAir()){
				v += gravity;
				fox.style.top = v + 'px';
			}
		}
		if(clippyDir === false){
			cH += cMove;
			clippy.style.left = cH + 'px';
			if(cH === rightEdge - 22){
				clippyDir = true;
			}
		}
		if(clippyDir === true){
			cH -= cMove;
			clippy.style.left = cH + 'px';
			if(cH === leftEdge){
				clippyDir = false;
			}
		}
		if(isShooting === true){
			aV -= 5;
			arrow.style.top = aV + 'px';
			if(aV <= 0){
				isShooting = false;
				aV = v - 20;
				aH = h + 8;
				arrow.style.top = aV;
				arrow.style.left = aH;
				arrow.style.visibility = 'hidden';
			}
		}
		if(movingRight===true){
			if(h < rightEdge){
				h += move;
				fox.style.left = h + 'px';
			}
		}
		if(movingLeft===true){
			if(h > leftEdge){
				h -= move;
				fox.style.left = h + 'px';
			}
		}
		if(bombDrop===true){
			if(bV <= bottomEdge + 25){
				bV += 5;
				bomb.style.visibility = 'visible';
				bomb.style.top = bV + 'px';
			}
			if(bV >= bottomEdge + 25){
				bH -= move;
				bomb.style.left = bH + 'px';
			}
			if(bH <= 0){
				bH = cH;
				bV = cV;
				bomb.style.top = bV;
				bomb.style.left = bH;
				bomb.style.visibility = 'visible';
				bombDrop = false;
			}
		}
		start();
	},20);
}