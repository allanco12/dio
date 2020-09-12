var engine = {

	"cores": ['green','purple','pink','red','yellow','orange','gray','blue','brown','black'],
	"hexaDasCores": {
		'green': '#02EF00',
		'purple': '#790093', 
		'pink': '#FFC0CB',
		'red': '#E90808',
		'yellow': '#E7D703',
		'orange': '#F16529',
		'gray': '#EBEBEB',
		'blue': '#251BAB',
		'brown': '#8A4E04',
		'black': '#141414'
	},
	"moedas": 0
};

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function sortearCor(){
	var indiceDaCorSorteada = Math.floor(Math.random() * engine.cores.length);
	var nomeDaCorSorteada = engine.cores[indiceDaCorSorteada];

	var el = document.getElementById("cor-na-caixa");
	el.innerText = engine.cores[indiceDaCorSorteada].toUpperCase();
	//pintarCaixa(nomeDaCorSorteada);
	return nomeDaCorSorteada;
}

function pintarCaixa(nomeDaCor){
	var el = document.getElementById("cor-atual");
	el.style.backgroundColor = engine.hexaDasCores[nomeDaCor];
	el.style.backgroundImage = "url('img/caixa-fechada.png')";
	el.style.backgroundSize = "100%";
}

function atualizarPontuacao(valor){
	var el = document.getElementById('pontuacao-atual');
	engine.moedas += valor;
	if(valor < 0){
		audioErrou.play();
	}else{
		audioMoeda.play();
	}

	el.innerText = engine.moedas;
}

var balao = document.getElementById('container-transcricao');

var btnGravador =document.getElementById('btn-responder');
var transcricaoAudio = "";

var gravador;

// API de Reconhecimento de Voz
if(window.SpeechRecognition || window.webkitSpeechRecognition){
	var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
	var gravador = new SpeechAPI();

	gravador.continuos = false;
	gravador.lang = "en-US";

	gravador.onstart = function(){
		btnGravador.innerText = "Estou Ouvindo";
		btnGravador.style.backgroundColor = "white";
		btnGravador.style.color = "black";
	};

	gravador.onend = function(){
		btnGravador.innerText = "RESPONDER";
		btnGravador.style.backgroundColor = "transparent";
		btnGravador.style.color = "white";
	};

	gravador.onresult = function(event){
		 transcricaoAudio = event.results[0][0].transcript.toUpperCase();
		 respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

		 console.log(transcricaoAudio);
		 if(transcricaoAudio === respostaCorreta){
		 	atualizarPontuacao(1);
		 	balao.classList.add('escondido');
		 }else{
		 	atualizarPontuacao(-1);
		 	var el = document.getElementById('transcricao-cor');
		 	el.innerText = transcricaoAudio;
		 	balao.classList.remove('escondido');
		 }

		 pintarCaixa(sortearCor());
	};

}else{
	alert("Infelizmente seu navegador não tem suporte ao reconhecimento de voz!");
}


btnGravador.addEventListener('click',function(){
	gravador.start();
});

// Inicialização
pintarCaixa(sortearCor());