var s = {};
var timer;

//boundaries
var leftEdge = 3; //Left boundary of the game area
var rightEdge = 775; //Right boundary of the game area
var topEdge = 26; //Top boundary of the game area
var bottomEdge = 590; //Bottom boundary of the game

//movement
var gravity = 3; //How many pixels the player moves with gravity
var jump = 3; //How many pixels something moves per tick when jumping
var move = 3; //Player move Left(-) Right(+)

//boolean

function resetState(){
	s.x = 3; //Player x position
	fox.style.top = s.y;
	s.y = 500; //Player y position
	fox.style.left = s.x;
	s.hillsCloseX = 0;
	hillsClose.style.left = s.hillsCloseX;
	s.cX = 0; //Clippy x position
	s.cY = 20; //Clippy y position
	s.cH = 127; //Clippy height
	s.cW = 50; //Clippy width
	s.aX = 810; //Arrow x position
	s.aY = 500; //Arrow y position
	s.bX = 810; //Ball x position
	s.bY = 560; //Ball y position
	s.c1X = -100;
	s.c2X = 350;
	s.tick = 0;
	s.clippyLife = 1;
	s.jumpedAt = 0;
	s.jumpLength = 30; //The length of a jump in ticks
	s.bLandedAt = 0;
	s.bTimerLength = 30;
	s.isJumping = false; //If the player is jumping
	s.clippyDir = false; //Clippy's direction of movement false = right
	s.isShooting = false; //If the player is shooting
	s.movingRight = false; //If the player is moving right
	s.movingLeft = false; //If the player is moving left
	s.bombDrop = false;
	s.bLanded = false;
}

function init(){
	clearTimeout(timer);
	d = document;
	d.onkeydown = keyDown;
	d.onkeyup = keyUp;
	s.bLandedAt = s.tick;
	hillsClose = d.getElementById('hills_close');
	gameArea = d.getElementById('gameArea');
	startScreen = d.getElementById('startScreen');
	startButton = d.getElementById('startButton');
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
	startScreen.style.visibility = 'visible';
	gameArea.style.visibility = 'hidden';
	//if(start is clicked){show gameArea and call loop function};
	$("#startButton").click(function(){
		startScreen.style.visibility = 'hidden';
		gameArea.style.visibility = 'visible';
		resetState();
		loop();
	});
}

function keyDown(evt){
	k = evt.keyCode;
	//move right
	if(k===68){
		if(s.x < rightEdge){
			s.movingRight = true;
		}
	}
	//move left
	if(k===65){
		if(s.x > leftEdge){
			s.movingLeft = true;
		}
	}
	//jump
	if(k===32){
		if(!inAir()){
			s.isJumping = true;
			s.jumpedAt = s.tick;
		}
	}
	if(k===66){
		if((s.bombDrop===false) && (s.bY <= bottomEdge - 6)){
			s.bombDrop = true;
			s.bY = s.cY + s.cH;
			s.bX = s.cX + 25;
			bomb.style.top = s.bY;
			bomb.style.left = s.bX;
			bomb.style.visibility = 'visible';
		}
	}
	if(k===90){
		if(s.isShooting === false){
			s.isShooting = true;
			s.aY = s.y - 20;
			s.aX = s.x + 8;
			arrow.style.top = s.aY;
			arrow.style.left = s.aX;
			arrow.style.visibility = 'visible';
		}
	}		
}


function keyUp(evt){
	k = evt.keyCode;
	if(k===68){
		s.movingRight = false;
	}
	if(k===65){
		s.movingLeft = false;
	}
}

function inAir(){
	return(s.y <= bottomEdge - 33);
}

function detectCollision(){ // check collision
	var cLeft = s.cX; //left edge of Clippy
	var cRight = s.cX + s.cW; //right edge of Clippy
	var cTop = s.cY; //top edge of Clippy
	var cBottom = s.cY + s.cH; //bottom edge of Clippy
	//if arrow s.x is > cLeft and < cRight
	if((s.aX > cLeft) && (s.aX < cRight)){
		//AND if arrow y is < cBottom and > cTop
		if((s.aY > cTop) && (s.aY < cBottom)){
			return true;
		}
	}
	return false;
}

function gameEnd()	{
	clearTimeout(timer);
	resetState();
}

function loop(){
	debug = 'Cx:' + s.cX + ' Cy:' + s.cY + ' Bx:' + s.bX + ' By:' + s.bY + ' move:' + move + ' tick:' + s.tick;
	debug += 'x: ' + s.x + ' hills:' + s.hillsCloseX + ' jA:' + s.jumpedAt + ' bLA:' + s.bLandedAt;
	position.innerHTML = debug;
	timer = setTimeout(function(){
		s.tick += 1;
		s.c1X += 1;
		cloud1.style.left = s.c1X + 'px';
		s.c2X += 1;
		cloud2.style.left = s.c2X + 'px';
		if(s.c1X >= 800){
			s.c1X = -100;
			cloud1.style.left = s.c1X;
		}
		if(s.c2X >= 800){
			s.c2X = -200;
			cloud2.style.left = s.c2X;
		}
		if(detectCollision()){
			s.isShooting = false;
			s.aY = 500;
			s.aX = 810;
			arrow.style.top = s.aY;
			arrow.style.left = s.aX;
			arrow.style.visibility = 'hidden';
			s.clippyLife -= 1;
		}
		if(s.clippyLife === 0){
			gameEnd();
			resetState();
		}
		//if jumping move up
		if(s.isJumping === true){
			s.y -= jump;
			fox.style.top = s.y + 'px';
			jumpPos = s.tick - s.jumpedAt;
				if(jumpPos >= s.jumpLength){
					s.isJumping = false;
				}
		}
		//if not jumping is he touching the ground? if he is not, fall.
		if(s.isJumping === false){
			if(inAir()){
				s.y += gravity;
				fox.style.top = s.y + 'px';
			}
		}
		if(s.clippyDir === false){
			s.cX += move;
			clippy.style.left = s.cX + 'px';
				if(s.cX >= rightEdge - 22){
					s.clippyDir = true;
				}
		}
		if(s.clippyDir === true){
			s.cX -= move;
			clippy.style.left = s.cX + 'px';
				if(s.cX <= leftEdge){
					s.clippyDir = false;
				}
		}
		if(s.isShooting === true){
			s.aY -= 10;
			arrow.style.top = s.aY + 'px';
				if(s.aY <= 0){
					s.isShooting = false;
					s.aY = 540;
					s.aX = 810;
					arrow.style.top = s.aY;
					arrow.style.left = s.aX;
					arrow.style.visibility = 'hidden';
				}
		}
		if(s.movingRight===true){
			if(s.x < rightEdge){
				s.x += move;
				fox.style.left = s.x + 'px';
				s.hillsCloseX -= 1;
				hills_close.style.left = s.hillsCloseX + 'px';
				s.c1X -= move;
				cloud1.style.left = s.c1X + 'px';
				s.c2X -= move;
				cloud2.style.left = s.c2X + 'px';
			}
		}
		if(s.movingLeft===true){
			if(s.x > leftEdge){
				s.x -= move;
				fox.style.left = s.x + 'px';
				s.hillsCloseX += 1;
				hills_close.style.left = s.hillsCloseX + 'px';
				s.c1X += move;
				cloud1.style.left = s.c1X + 'px';
				s.c2X += move;
				cloud2.style.left = s.c2X + 'px';
			}
		}
		if((s.bombDrop===true) && (s.bY <= bottomEdge - 6)){
			s.bY += 5;
			bomb.style.top = s.bY + 'px';
			//if(bomb lands on bottomEdge){start timing};
			if(s.bY >= bottomEdge - 3){
				s.bLanded = true;
				if(s.bLanded===true){
					//bPos = current tick - the tick # that the bomb landed
					bPos = s.tick - s.bLandedAt;
					//if(bPos >= length of bomb timer){explode}
					if(bPos >= s.bTimerLength){
						s.bombDrop = false;
						s.bX = 810;
						bomb.style.left = s.bX;
						s.bY = 500;
						bomb.style.top = s.bY;
					}
				}
			}
		}
		
		loop();
	},15);
}