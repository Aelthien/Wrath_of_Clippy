var s = {};
function resetState(){
	var x = 3; //Player x position
	var y = 500; //Player y position
	var hillsCloseX = -100;
	var cX = 0; //Clippy x position
	var cY = 20; //Clippy y position
	var cH = 127; //Clippy height
	var cW = 50; //Clippy width
	var aX = 810; //Arrow x position
	var aY = 500; //Arrow y position
	var bX = 810; //Ball x potition
	var bY = 560; //Ball y position
	var c1X = -100;
	var c2X = 350;
	var tick = 0;
	var clippyLife = 1;
	var jumpedAt = 0;
	var jumpLength = 30; //The length of a jump in ticks
	var isJumping = false; //If the player is jumping
	var clippyDir = false; //Clippy's direction of movement false = right
	var isShooting = false; //If the player is shooting
	var movingRight = false; //If the player is moving right
	var movingLeft = false; //If the player is moving left
	var bombDrop = false;
}
//positions


//boundaries
var leftEdge = 3; //Left boundary of the game area
var rightEdge = 772; //Right boundary of the game area
var topEdge = 26; //Top boundary of the game area
var bottomEdge = 590; //Bottom boundary of the game

//movement
var gravity = 3; //How many pixels the player moves with gravity
var jump = 3; //How many pixels something moves per tick when jumping
var move = 3; //Player move Left(-) Right(+)
var cMove = 3; //Clippy move Left(-) Right(+) Must be an odd number

//time


//boolean


function init(){
	d = document;
	d.onkeydown = keyDown;
	d.onkeyup = keyUp;
	hills_close = d.getElementById('hills_close');
	gameArea = d.getElementById('gameArea');
	startScreen = d.getElementById('startScreen');
	startButton = d.getElementById('startButton');
	gameArea.style.visibility = 'hidden';
	fox = d.getElementById('fox');
	hp = d.getElementById('hp');
	arrow = d.getElementById('arrow');
	bomb = d.getElementById('bomb');
	lives = d.getElementById('lives');
	clippy = d.getElementById('clippy');
	position = d.getElementById('position');
	cloud1 = d.getElementById('cloud1');
	cloud2 = d.getElementById('cloud2');
	arrow.style.visibility = 'hidden';
	bomb.style.visibility = 'hidden';
	//if(start is clicked){show gameArea and call loop function};
	$("#startButton").click(function(){
		startScreen.style.visibility = 'hidden';
		gameArea.style.visibility = 'visible';
		loop();
	});
}

function reset(){
	alert('reset');
}

function keyDown(evt){
	k = evt.keyCode;
	//move right
	if(k===68){
		if(x < rightEdge){
			movingRight = true;
		}
	}
	//move left
	if(k===65){
		if(x > leftEdge){
			movingLeft = true;
		}
	}
	//jump
	if(k===32){
		if(!inAir()){
			isJumping = true;
			jumpedAt = tick;
		}
	}
	if(k===66){
		if(bombDrop===false){
			bombDrop = true;
			bY = cY + cH;
			bX = cX + 25;
			bomb.style.top = bY;
			bomb.style.left = bX;
			bomb.style.visibility = 'visible';
		}
	}
	if(k===90){
		if(isShooting === false){
			isShooting = true;
			aY = y - 20;
			aX = x + 8;
			arrow.style.top = aY;
			arrow.style.left = aX;
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
	return(y <= bottomEdge - 33);
}

function detectCollision(){ // check collision
	var cLeft = cX; //left edge of Clippy
	var cRight = cX + cW; //right edge of Clippy
	var cTop = cY; //top edge of Clippy
	var cBottom = cY + cH; //bottom edge of Clippy
	//if arrow x is > cLeft and < cRight
	if((aX > cLeft) && (aX < cRight)){
		//AND if arrow y is < cBottom and > cTop
		if((aY > cTop) && (aY < cBottom)){
			return true;
		}
	}
	return false;
}

function gameEnd()	{
	clearTimeout(timer);
	reset();
}

function loop(){
	debug = 'Cx:' + cX + ' Cy:' + cY + ' Bx:' + bX + ' By:' + bY;
	position.innerHTML = debug;
	tick += 1;
	c1X += 1;
	cloud1.style.left = c1X + 'px';
	c2X += 1;
	cloud2.style.left = c2X + 'px';
	if(c1X >= 800){
		c1X = -100;
		cloud1.style.left = c1X;
	}
	if(c2X >= 800){
		c2X = -200;
		cloud2.style.left = c2X;
	}
	setTimeout(function(){
		if(detectCollision()){
			isShooting = false;
			aY = 500;
			aX = 810;
			arrow.style.top = aY;
			arrow.style.left = aX;
			arrow.style.visibility = 'hidden';
			clippyLife -= 1;
		}
		if(clippyLife === 0){
			//end the game
			gameEnd();
		}
	//if jumping move up
		if(isJumping === true){
			y -= jump;
			fox.style.top = y + 'px';
			jumpPos = tick - jumpedAt;
				if(jumpPos >= jumpLength){
					isJumping = false;
				}
		}
		//if not jumping is he touching the ground? if he is not, fall.
		if(isJumping === false){
			if(inAir()){
				y += gravity;
				fox.style.top = y + 'px';
			}
		}
		if(clippyDir === false){
			cX += cMove;
			clippy.style.left = cX + 'px';
				if(cX === rightEdge - 22){
					clippyDir = true;
				}
		}
		if(clippyDir === true){
			cX -= cMove;
			clippy.style.left = cX + 'px';
				if(cX === leftEdge){
					clippyDir = false;
				}
		}
		if(isShooting === true){
			aY -= 10;
			arrow.style.top = aY + 'px';
				if(aY <= 0){
					isShooting = false;
					aY = 540;
					aX = 810;
					arrow.style.top = aY;
					arrow.style.left = aX;
					arrow.style.visibility = 'hidden';
				}
		}
		if(movingRight===true){
			if(x < rightEdge){
				x += move;
				fox.style.left = x + 'px';
				hillsCloseX -= 1;
				hills_close.style.left = hillsCloseX + 'px';
				c1X -= move;
				cloud1.style.left = c1X + 'px';
				c2X -= move;
				cloud2.style.left = c2X + 'px';
			}
		}
		if(movingLeft===true){
			if(x > leftEdge){
				x -= move;
				fox.style.left = x + 'px';
				hillsCloseX += 1;
				hills_close.style.left = hillsCloseX + 'px';
				c1X += move;
				cloud1.style.left = c1X + 'px';
				c2X += move;
				cloud2.style.left = c2X + 'px';
			}
		}
		if((bombDrop===true) && (bY < bottomEdge - 6)){
			bY += 5;
			bomb.style.top = bY + 'px';
				if(bY >= bottomEdge - 6){
					//start timed explosion
				}
		}
		
		loop();
	},15);
}