//Lógica para atualizar sempre o tamanho da página
var largura = 0
var altura = 0
var vidas = 1
var tempo = 10

var criaMosquito = 500

var nivel = window.location.search
nivel.replace('?', '')

if(nivel === 'normal'){
    criaMosquito = 1500
}else if(nivel === 'dificil'){
    criaMosquito = 1000
}else if(nivel === 'chucknorris'){
    criaMosquito = 750
}

//Função para atualizar o tamanho da página
function ajustaTamanho(){
    //Pega as medidas atuais da página, incluindo a barra de rolagem
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}
ajustaTamanho()

//cronometro de tempo jogado
var cronometro = setInterval(function() {
    tempo -= 1

    //condição para finalizar as moscas e o cronometro no final do jogo
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

/* ---------------------------------------------------------- */

//Cria coordenadas aleatórias, adiciona uma imagem e coloca a imagem na posição de acordo com a coordenada
function posicaoRandomica(){
    //condição para remover um mosquito caso exista para ficar apenas 1 por página, também está fazendo a contabilidade das vidas caso não sejam clicados
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            //redireciona para a página de game over
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src='imagens/coracao_vazio.png'
            vidas++
        }

    }
    
    //Cria uma coordenada aleatória dento do espaço disponível para a tela diminuindo uma certa quantidade
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90
    
    //Avalia se as posições são menores que 0, se sim elas são enviadas para a posição 0, se não segue as que foram geradas
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)
    
    //criar o elemento HTML
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    //Aplica o estilo do css ao elemento criado e altera o tamanho dele se precisar, também vai alterar a posição do seu olhar
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    //Coloca o elemento nas coordenadas geradas aleatoriamente
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }

    document.body.appendChild(mosquito)

}

//Função para alterar o tamanho dos mosquito
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//Função para alterar a posição da visão do mosquito
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}