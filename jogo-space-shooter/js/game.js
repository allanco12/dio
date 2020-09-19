const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const playerVerticalStep = 50;
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const gamepadIcon =  document.querySelector('.gamepad-icon');
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
const gameOverDialogBox = document.querySelector('.gameover');

let alienInterval;
let gameState = 'menu';


//movimento e tiro da nave
function flyShip(event) {
	if(event.key === 'ArrowUp') {
		event.preventDefault();
		moveUp();
	} else if(event.key === 'ArrowDown') {
		event.preventDefault();
		moveDown();
	} else if(event.key === " ") {
		event.preventDefault();
		fireLaser();
	}
}

//função de subir
function moveUp() {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if(topPosition === "0px") {
		return
	} else {
		let position = parseInt(topPosition);
		position -= playerVerticalStep;
		yourShip.style.top = `${position}px`;
	}
}

//função de descer
function moveDown() {
	let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
	if(topPosition === "500px"){
		return
	} else {
		let position = parseInt(topPosition);
		position += playerVerticalStep;
		yourShip.style.top = `${position}px`;
	}
}

// funcionalidade de tiro
function fireLaser() {
	let laser = createLaserElement();
	playArea.appendChild(laser);
	moveLaser(laser);
}

function createLaserElement() {
	let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
	let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
	let newLaser = document.createElement('img');
	newLaser.src = 'img/shoot.png';
	newLaser.classList.add('laser');
	newLaser.style.left = `${xPosition}px`;
	newLaser.style.top = `${yPosition - 10}px`;
	return newLaser;
}

function moveLaser(laser) {
	let laserInterval = setInterval(() => {
		let xPosition = parseInt(laser.style.left);
		let aliens = document.querySelectorAll('.alien');

		aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
			if(checkLaserCollision(laser, alien)) {
				alien.src = 'img/explosion.png';
				alien.classList.remove('alien');
				alien.classList.add('dead-alien');
			}
		})

		if(xPosition === 340) {
			laser.remove();
		} else {
			laser.style.left = `${xPosition + 8}px`;
		}
	}, 10);
}

//função para criar inimigos aleatórios
function createAliens() {
	let newAlien = document.createElement('img');
	let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
	newAlien.src = alienSprite;
	newAlien.classList.add('alien');
	newAlien.classList.add('alien-transition');
	newAlien.style.left = '370px';
	newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
	playArea.appendChild(newAlien);
	moveAlien(newAlien);
}

//função para movimentar os inimigos
function moveAlien(alien) {
	let moveAlienInterval = setInterval(() => {
		let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
		if(xPosition <= 50) {
			if(Array.from(alien.classList).includes('dead-alien')) {
				alien.remove();
			} else {
				gameOver();
			}
		} else {
			alien.style.left = `${xPosition - 4}px`;
		}
	}, 30);
}

//função para  colisão
function checkLaserCollision(laser, alien) {
	let laserTop = parseInt(laser.style.top);
	let laserLeft = parseInt(laser.style.left);
	let laserBottom = laserTop - 20;
	let alienTop = parseInt(alien.style.top);
	let alienLeft = parseInt(alien.style.left);
	let alienBottom = alienTop - 30;
	if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
		if(laserTop <= alienTop && laserTop >= alienBottom) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}



//inicio do jogo
function playGame() {
	gameState = 'playing';
	startButton.style.display = 'none';
	instructionsText.style.display = 'none';
	window.addEventListener('keydown', flyShip);
	alienInterval = setInterval(() => {
		createAliens();
	},2000);
}

function gameOver() {
	gameState = 'gameover';
	window.removeEventListener('keydown', flyShip);
	clearInterval(alienInterval);
	let aliens = document.querySelectorAll('.alien');
	aliens.forEach((alien) => alien.remove());
	let lasers = document.querySelectorAll('.laser');
	
	setTimeout(()=>{
		gameOverDialogBox.classList.remove('escondido');
		yourShip.style.top = "250px";
		startButton.style.display = "block";
		instructionsText.style.display = "block";		
	});

	setTimeout(()=>{
		transitionFromGameOver();
	},4000);



}

function transitionFromGameOver(){
	gameOverDialogBox.classList.add('escondido');
	gameState='menu';
}



/*  Listeners  */
startButton.addEventListener('click',(event) => {
	playGame();
});

window.addEventListener("gamepadconnected", gamepadConnected );
window.addEventListener('gamepaddisconnected', gamepadDisconnected);




/*
========================================
=== Métodos para lidar com o GamePad ===
========================================
*/
function gamepadDisconnected(event){
	console.log('Lost connection with the gamepad.');
	gamepadIcon.classList.add("escondido");
}

function gamepadConnected(e) {
	var gp = navigator.getGamepads()[e.gamepad.index];
	gamepadIcon.classList.remove("escondido");
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
	gp.index, gp.id,
	gp.buttons.length, gp.axes.length);
	//console.log(gp.buttons);
	//console.log(gp);

	let anyButtonPressed = gp.buttons.reduce((valor,bt) => {
		//console.log(bt);
		return valor || bt.pressed;
	},false);

	// Isso vai iniciar o jogo se qualquer botão do gamepad for apertado!
	if(anyButtonPressed && gameState !== 'playing' && gameState !=='gameover') playGame();

	// Porém, se ao invés de um botão era um eixo!!! o jogo não vai começar
	// mas o gamepad será conectado!

}



function buttonPressed(b) {
  if (typeof(b) == "object") {
	return b.pressed;
  }
  return b == 1.0;
}


var interval = setInterval(movejogadorGamepad, 60);

	function movejogadorGamepad() {



		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		if (!gamepads) {
			return;
		}

		var gp = gamepads[0];

		if(gp === null) return;

		if(gameState === 'playing'){

			if (buttonPressed(gp.buttons[12])){
				//moveJogadorUp();
				moveUp();
			}
			 
			if (buttonPressed(gp.buttons[13])){	
				//moveJogadorDown	();
				moveDown();
			}
		}

		if (buttonPressed(gp.buttons[0]) || buttonPressed(gp.buttons[1]) || 
			buttonPressed(gp.buttons[2]) || buttonPressed(gp.buttons[3])){		
		
			if(gameState === 'playing')
				fireLaser();
			else if(gameState === 'menu')
				playGame();
		}

/*
		let anyButtonPressed = gp.buttons.reduce((valor,bt) => {
			//console.log(bt);
		return valor || bt.pressed;
		},false);

		if(anyButtonPressed){
			console.log(gp.buttons);

			// 13 = down
			// 12 = up
			// 0 = A
			// 1 = B
			// 2 = X
			// Y = 3


		}

*/
}		