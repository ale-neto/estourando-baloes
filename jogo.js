var timerId = null;

function iniciarJogo(){
    var url = window.location.search;
    var nivel = url.replace('?','');
    var tempo_segundo = 0;

    if(nivel == 1){
        tempo_segundo = 120;
    }
    if(nivel == 2){
        tempo_segundo = 60;
    }
    if(nivel == 3){
        tempo_segundo = 30;
    }

    document.getElementById('cronometro').innerHTML = tempo_segundo;
    var qtd_baloes = Math.floor(Math.random() * 80);
    criarBaloes(qtd_baloes);
    document.getElementById('baloesInteiros').innerHTML = qtd_baloes;
    document.getElementById('baloesEstourados').innerHTML = 0;
    contagemTempo(tempo_segundo + 1);
}

function contagemTempo(segundos){
    segundos =  segundos - 1;
    if( segundos == -1){
        clearTimeout(timerId);
        gameOver();
        return false;
    }
    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout('contagemTempo('+segundos+')', 1000);
    
}

function gameOver(){
    alert('Fim de jogo');
}

function criarBaloes(qtd_baloes){
    for(var i = 1; i <= qtd_baloes; i++){
        var balao =  document.createElement('img');
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' + i;
        balao.onclick = function(){
            estourar(this);
        }
        document.getElementById('cenario').appendChild(balao);

    }
}

function estourar (e){
    var idBalao = e.id; 
    document.getElementById(idBalao).setAttribute('onclick', '');
    document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);
}

function pontuacao (click){
    var baloesInteiros = document.getElementById('baloesInteiros').innerHTML;
    var baloesEstourados = document.getElementById('baloesEstourados').innerHTML;
    baloesInteiros = parseInt(baloesInteiros);
    baloesEstourados = parseInt(baloesEstourados);
    baloesInteiros = baloesInteiros + click;
    baloesEstourados = baloesEstourados - click;

    document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
    document.getElementById('baloesEstourados').innerHTML = baloesEstourados;

    situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros){
    if(baloesInteiros == 0){
        alert('Parabens, você ganhou!');
        pararJogo();
    }
}

function pararJogo(){
    clearTimeout(timerId);
}