var resp = window.document.getElementById('saida')
var imagem = window.document.createElement('img')
imagem.setAttribute('id', 'bicho')

function procurar() { // chamada do evento de clique
    var bichos = window.document.getElementsByName('radbicho')

    var nome = String()

    if (bichos[0].checked) { // macaco
        nome = 'macaco'
        imagem.src = 'imagens/foto-macaco.png'
        document.body.style.background = '#ba7856'
    } else if (bichos[1].checked) { // onça
        nome = 'onça'
        imagem.setAttribute('src', 'imagens/foto-onca.png')
        document.body.style.background = '#9a722a'
    } else if (bichos[2].checked) { // zebra
        nome = 'zebra'
        imagem.setAttribute('src', 'imagens/foto-zebra.png')
        document.body.style.background = '#212026'
    } else if (bichos[3].checked){ // pavão
        nome = 'pavão'
        imagem.setAttribute('src', 'imagens/foto-pavao.png')
        document.body.style.background = '#055fb5'
    } else { // elefante
        nome = 'elefante'
        imagem.setAttribute('src', 'imagens/foto-elefante.png')
        document.body.style.background = '#6e6671'
    }
    
    resp.innerHTML = `Aqui está um(a) ${nome}`
    resp.style.textAlign = 'center'
    resp.style.font = 'bold 16pt arial'

    resp.appendChild(imagem)
}