// Math é um objeto usado para realizar operações matemáticas
// método random vai sortear um numero aleatorio entre 0 e 1
const numeroAleratorio = parseInt(Math.random()*100+1)
const jogadaVetor = new Audio('js/stock.mp3')
const erro = new Audio('js/buzzer.mp3')
const numeroRepetido = new Audio('js/ohoh.mp3')
//console.log(numeroAleratorio)

// manipulando os elementos html
const botaojogar = document.querySelector('#jogar') // constante que vai receber botão jogar
const caixaTexto = document.querySelector('#txtNumero') // caixa de texto
const jogadasAnteriores = document.querySelector('.vezes') // span
const jogadasRestantes = document.querySelector('.numChances') //span
const recomecar = document.querySelector('.resultados') // elemento html div
const avisos = document.querySelector('.avisos') // pegando terceiro paragrafo da div resultados

// criando um paragrafo com o JavaScript
const paragrafo = document.createElement('p') // criando um paragrafo

// criando um vetor vazio
const numerosJogados = []

// criando uma variavel que representará um contador
let minhasJogadas = 1

//variavel para informar que podemos jogar
let playGame = true

if(playGame){
    botaojogar.addEventListener('click', function(e){ // criando function expression passando como parametro o botaojogar
        e.preventDefault() // retirar a ação de envio do botão
        let tentativa = parseInt(caixaTexto.value) // variavel que receberá um numero inteiro. Este número, será informado pelo usuário
        validaChances(tentativa)
    })
}

function validaChances(num){
    if(isNaN(num)){ // se o valor recebido na função não for um número execute
        erro.play()
        alert('Atenção, informe apenas digitos numericos') // configurando mensagem de erro
        caixaTexto.value = '' // limpando o conteudo da caixa de texto
        caixaTexto.focus() // setando o foco (cursor) para usuario informar um novo número
    }

    else if(num < 1 || num > 100){
        erro.play()
        alert('digito inválido !!! informe apenas valores entre 1 e 100.')
        caixaTexto.value = ''
        caixaTexto.focus()
    }

    else if(numerosJogados.includes(num)){
        numeroRepetido.play()
        alert(`O número ${num} já foi jogado. Informe um outro valor numérico`)
        caixaTexto.value = ''
        caixaTexto.focus()
    }

    else{
        numerosJogados.push(num)
        jogadaVetor.play()
        if(minhasJogadas === 6 && num != numeroAleratorio){
            displayTentativas(num)
            msgTexto(`Game Over !! O número secreto era ${numeroAleratorio}`)
            fimJogo()
        }
        else{  
            checarTentativas(num)          
            displayTentativas(num)            
        }
    }    
}

function checarTentativas(num){
    if(num === numeroAleratorio){
        msgTexto(`Parabéns, ${num} é o número secreto.`)
        fimJogo()
    }
    else if(num < numeroAleratorio){
        msgTexto('Palpilte Baixo, tente novamente')
        caixaTexto.value = ''
        caixaTexto.focus()
    }
    else if(num > numeroAleratorio){
        msgTexto('Palpilte alto D++, tente novamente')
        caixaTexto.value = ''
        caixaTexto.focus()
    }
}

function displayTentativas(num){
    caixaTexto.value = ''
    caixaTexto.focus()
    if(minhasJogadas <= 5){
        jogadasAnteriores.innerHTML += `${num},`
}
else{
    jogadasAnteriores.innerHTML += `${num}`
}
    minhasJogadas++
    jogadasRestantes.innerHTML = `${7 - minhasJogadas}`

}

function msgTexto(msg){
    avisos.innerHTML = `<h1>${msg}</h1>`
}

function fimJogo(){
    caixaTexto.setAttribute('disabled','')
    botaojogar.setAttribute('disabled', '')
    paragrafo.innerHTML = '<button id="iniciarJogada">Iniciar Game</buttom>'
    recomecar.appendChild(paragrafo)
    playGame = false
}


