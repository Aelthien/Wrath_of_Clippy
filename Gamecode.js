var fox;
var clippy;
var arrow;
var bomb;
var dot;
var hp;
var lives;
var exit;
var position;
var currentLives;

var h = 3; //Player's horizontal position
var v = 500; //Players vertical position
var cH = 0; //Clippy's horizontal position
var cV = 20; //Clippy's vertical position
var aH = 810;
var aV = 500;
var bH = 810;
var bV = 560;
var leftEdge = 3; //Left boundary of the game area
var rightEdge = 772; //Right boundary of the game area
var topEdge = 26; //Top boundary of the game area
var bottomEdge = 558; //Bottom boundary of the game
var gravity = 3; //How many pixels the player moves with gravity
var jump = 3; //How many pixels something moves per tick when jumping
var move = 6; //Player move Left(-) Right(+)
var cMove = 3; //Clippy move Left(-) Right(+) Must be an odd number
var tick = 0;
var jumpedAt = 0;
var jumpLength = 30; //The length of a jump in ticks
var isJumping = false;
var clippyDir = false;
var isShooting = false;
var movingRight = false; //If the player is moving right
var movingLeft = false; //If the player is moving left
var bombDrop = false;
var collision = false;

function init(){
	fox = document.getElementById('fox');
	hp = document.getElementById('hp');
	arrow = document.getElementById('arrow');
	bomb = document.getElementById('bomb');
	dot = document.getElementById('dot');
	lives = document.getElementById('lives');
	clippy = document.getElementById('clippy');
	exit = document.getElementById('exit');
	position = document.getElementById('position');
	arrow.style.visibility = 'hidden';
	bomb.style.visibility = 'hidden';
	document.onkeydown = keyDown;
	document.onkeyup = keyUp;
	loop();
}

function keyDown(evt){
	k = evt.keyCode;
	//move right
	if(k===68){
		if(h < rightEdge){
			movingRight = true;
		}
	}
	//move left
	if(k===65){
		if(h > leftEdge){
			movingLeft = true;
		}
	}
	//jump
	if(k===32){
		if(!inAir()){
			isJumping = true;
			jumpedAt = ticks;
		}
	}
	if(k===66){
		if(bombDrop===false){
			bombDrop = true;
			bV = cV;
			bH = cH;
			bomb.style.top = cV;
			bomb.style.left = cH;
			bomb.style.visibility = 'visible';
		}
	}
	if(k===90){
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
	k = evt.keyCode;
	if(k===68){
		movingRight = false;
	}
	if(k===65){
		movingLeft = false;
	}
}

function inAir(){
	return(v <= bottomEdge);
}

function detectCollision(){ // check collision
	xAxisPos = (cH + 25) - aH;
    yAxisPos = cV - aV;
    combinedWidth = 30;
    return ((xAxisPos * xAxisPos)
    		
    		+
    		
    		(yAxisPos * yAxisPos)
    		
    		<=
    			
    		(combinedWidth * combinedWidth));
}

function loop(){
	if(detectCollision()){
		collision = true;
		isShooting = false;
		aV = 500;
		aH = 810;
		arrow.style.top = aV;
		arrow.style.left = aH;
		arrow.style.visibility = 'hidden';
		alert('lol');
	}
	if(!detectCollision()){
		collision = false;
	}
	debug = ' V:' + v + ' H:' + h + ' CH:' + cH + ' CV' + cV + ' AV:' + aV + ' bH:' + bH;
	debug += ' Jumping = ' + isJumping + ' Shooting = ' + isShooting + ' Collided = ' + collision;
	position.innerHTML = 'Debug' + debug;
	tick += 1;
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
		aV -= 10;
		arrow.style.top = aV + 'px';
		if(aV <= 0){
			isShooting = false;
			aV = 540;
			aH = 810;
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
			bomb.style.top = bV + 'px';
		}
		if(bV >= bottomEdge + 25){
			if(isJumping===false){
				if(bH===h){
					bomb.style.visibility = 'hidden';
				}
			}
		}
		if(bH <= 0){
			bH = 810;
			bomb.style.left = bH + 'px';
			bomb.style.visibility = 'hidden';
			bombDrop = false;
		}
	}
		loop();
	},20);
}