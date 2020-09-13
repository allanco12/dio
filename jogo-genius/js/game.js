let order = [];				// sequencia das luzes que acendem
let clickedOrder = [];		// sequencia de cliques do jogador
let score = 0;				// pontuação do jogador

/*
	Codigo das cores:
	0 - verde
	1 - vermelho
	2 - amarelo
	3 - azul
*/
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');


let shuffleOrder = () => { 
	let corSorteada = Math.floor(Math.random() * 4);
	order.push(corSorteada);
	clickedOrder = [];

	for(let i in order){
		let elementColor = createColorElement(order[i]);
		lightColor(elementColor, Number(i) + 1);		
	}
};

let lightColor = (element, number) => {
	number = number * 500;
	setTimeout(() => {
		element.classList.add('selected');
	}, number - 250);

	setTimeout(() => {
		element.classList.remove('selected');
	});
};

let checkOrder = () => {
	for(let i in clickedOrder){
		if(clickedOrder[i] != order[i]) {
			gameOver();
			break;
		}
	}

	if(clickedOrder.length == order.length) {
		alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
		nextLevel();
	}
};

// função para o clique do usuario
let click = (color) => {
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected');

	setTimeout(() => {
		createColorElement(color).classList.remove('selected');
		checkOrder();
	}, 250);

};

/// fFunção que retorna a cor
let createColorElement = (color) => {
	if(color == 0) {
		return green;
	} else if(color == 1) {
		return red;
	} else if(color == 2) {
		return yellow;
	} else if(color == 3) {
		return blue;
	}
};


// Função para proximo nivel do jogo
let nextLevel = () => {
	 score++;
	 shuffleOrder();	 
};

// Função para game over
let gameOver = () => {
	alert(`Pontuação: ' ${score}z\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);
	order = [];
	clickedOrder = [];

	playGame();
};

// funcao de inicio do jogo
let playGame = () => {
	alert('Bem vindo ao genesis! Iniciando novo jogo');
	score = 0;

	nextLevel();
};

/*
green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));
*/

// Eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// Inicio do jogo
playGame();

