const picBoxJogadorSelecionado = document.getElementById('jogador');
const picBoxVencedor = document.getElementById('vencedor');
const quadrados = document.querySelectorAll('.quadrado');
const hihglightColor = '#0f0';

let jogador = 'null';
let gameOver = false;

function escolherQuadrado(quadrado){
	
	if(gameOver)
		return;

	if(quadrado.getAttribute('jogador') !== '-')
		return;

	quadrado.setAttribute('jogador', jogador);
	quadrado.classList.add('jogador' + jogador);

	if(jogador === 'X')
		jogador = 'O';
	else
		jogador = 'X';

	mudarJogador(jogador);
	checarVencedor();
}

function mudarJogador(valor){
	jogador = valor;
	picBoxJogadorSelecionado.classList.remove('jogadorX');
	picBoxJogadorSelecionado.classList.remove('jogadorO');
	picBoxJogadorSelecionado.classList.add('jogador'+jogador);
}

function mudarVencedor(valor){
	vencedor = valor;
	picBoxVencedor.classList.remove('jogadorX');
	picBoxVencedor.classList.remove('jogadorO');
	if(valor !== null)
		picBoxVencedor.classList.add('jogador'+vencedor);
}

function checarVencedor() {

	let tuplas3 = [
					[1,2,3],[4,5,6],[7,8,9],
					[1,4,5],[2,5,8],[3,6,9],
					[1,5,9],[3,5,7]
				];

	for(let i = 0; i < tuplas3.length; i++){
		let r = checarTupla3(tuplas3[i]);
		if(r.eIgual){
			hilightTupla3(tuplas3[i]);	
			mudarVencedor(r.vencedor)
			gameOver = true;
			break;	
		}
	}

}

function checarTupla3(arr){

	var arrQuadrados = Array.from(quadrados);

	var quads = arrQuadrados.filter(quadrado => {
		return arr.includes(parseInt(quadrado.getAttribute('id')));
	}).map(quadrado => quadrado.getAttribute('jogador'));

	//return (!quads.includes('-') && (quads[0] === quads[1] && quads[1] === quads[2]));

	return {
		eIgual: (!quads.includes('-') && (quads[0] === quads[1] && quads[1] === quads[2])),
		vencedor: quads[0]
	};
}


function hilightTupla3(arr){
	arr.forEach(valor => {
		quadrados[valor-1].style.backgroundColor = hihglightColor;
	});
}


function reiniciarJogo(){
	mudarVencedor(null);
	var arrQuadrados =  Array.from(quadrados);
	arrQuadrados.forEach(quadrado => {
		quadrado.classList.remove('jogadorX');
		quadrado.classList.remove('jogadorO');
		quadrado.setAttribute('jogador','-');
	});

	gameOver = false;
	mudarJogador('X');
}

/* inicialização */

mudarJogador('X');