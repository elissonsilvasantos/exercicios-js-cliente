var painel = window.document.getElementsByTagName('section')[0]
var barra = window.document.getElementById('barra')
var areaModo = window.document.querySelector('div#modo')
var areaForm = window.document.querySelector('div#formulario')
var areaResult = window.document.querySelector('div#resultado')

var registros = [] // banco de registros 

function escolherPainel(){ // selecionar modo por barra superior
    
    // limpando elementos antigos
    areaForm.innerHTML = ''
    areaResult.innerHTML = ''

    switch (Number(barra.value)) {
        case 1: // cadastro
            painelCadastro()
            break
        case 2: // consulta
            painelConsulta()
            break
    }
}

function painelCadastro() {

    window.document.body.style.background = 'rgb(21, 48, 202)' // cor do doc.
    painel.style.width = '410px' // ajustando largura do painel

    areaForm.style.textAlign = 'left' // previnir da conf. do outro painel

    /* configurando os campos editáveis */
    var txtNome = window.document.createElement('input') // nome
    txtNome.setAttribute('id', 'txtnome')
    txtNome.setAttribute('class', 'campo')

    var txtCpf = window.document.createElement('input') // CPF
    txtCpf.setAttribute('id', 'txtcpf')
    txtCpf.setAttribute('class', 'campo')

    var txtTel = window.document.createElement('input') // telefone
    txtTel.setAttribute('id', 'txttel')
    txtTel.setAttribute('class', 'campo')

    areaForm.innerHTML += 'Nome completo: '
    areaForm.appendChild(txtNome)
    areaForm.innerHTML += '<br/> CPF: '
    areaForm.appendChild(txtCpf)
    areaForm.innerHTML += '<br/> Telefone: '
    areaForm.appendChild(txtTel)

    /* div especial para agregar o botão */
    let divaux = window.document.createElement('div')
    divaux.setAttribute('id', 'aux')
    areaForm.appendChild(divaux)

    /* configurando botão */
    var btnCad = window.document.createElement('input')
    btnCad.setAttribute('type', 'button')
    btnCad.setAttribute('id', 'btncad')
    btnCad.setAttribute('class', 'btn')
    btnCad.setAttribute('value', 'cadastrar')

    divaux.appendChild(btnCad)

    btnCad.addEventListener('click', cadastrar) // evento de clique do botão

    // mensagem inicial
    areaResult.innerHTML = 'preencha os dados acima e aperte ' + 
    '<strong>cadastrar</strong>.'
    areaResult.style.color = 'black' // prevenindo das configurações anteriores
}

function cadastrar(){
    let campos = window.document.getElementsByClassName('campo')
    let valores = []
    
    let certo = true

    /* verificar se todos campos foram preenchidos */
    for (let x=0; x<campos.length && certo; x++){
        valores.push(campos[x].value.trim())
        if (valores[x] == ''){ // vazio
            certo = !certo
        }
    }

    if (!certo){ // erro: se algum campo estiver vazio
        let msg = 'por favor, preencha todos os campos!'
        areaResult.innerHTML = msg
        areaResult.style.color = 'red'
    } else if (procurarPorCpf(valores[1])){ // erro: cpf já cadastrado
        let msg = 'CPF já cadastrado!'
        areaResult.innerHTML = msg
        areaResult.style.color = 'red'
    } else { // fluxo principal
        let reg = { // registro
            nome: valores[0],
            cpf: valores[1],
            numero: valores[2]
        }
        registros.push(reg) // inserindo registro na estrutura

        let msg = 'cadastrado com sucesso!'
        areaResult.innerHTML = msg
        areaResult.style.color = 'green'
    }
    
}

function painelConsulta(){

    window.document.body.style.background = 'rgb(7, 173, 76)' // cor do documento
    painel.style.width = '260px' // ajustando largura do painel

    areaForm.style.textAlign = 'center'

    var txtCpf = window.document.createElement('input') // campo único de CPF
    txtCpf.setAttribute('id', 'txtcpf')
    txtCpf.setAttribute('class', 'campo')
    txtCpf.style.margin = 'auto'

    areaForm.innerHTML = 'CPF: '
    areaForm.appendChild(txtCpf)

    /* div especial para agregar o botão */
    let divaux = window.document.createElement('div')
    divaux.setAttribute('id', 'aux')
    areaForm.appendChild(divaux)

    /* configurando botão */
    var btnCon = window.document.createElement('input')
    btnCon.setAttribute('type', 'button')
    btnCon.setAttribute('id', 'btncon')
    btnCon.setAttribute('class', 'btn')
    btnCon.setAttribute('value', 'consultar')

    divaux.appendChild(btnCon)

    btnCon.addEventListener('click', consultar)

    // mensagem inicial
    areaResult.innerHTML = 'informe CPF e aperte <strong>consultar</strong>.'
    areaResult.style.color = 'black' // prevenindo das configurações anteriores
}

function consultar(){
    let campoCpf = window.document.querySelector('input.campo')
    let cpf = campoCpf.value.trim()

    let reg
    
    if (cpf.length == 0) { // erro: se o campo CPF estiver vazio
        let msg = 'preencha o campo acima!'
        areaResult.innerHTML = msg
        areaResult.style.color = 'red'
    } else if (registros.length == 0 || !(reg = procurarPorCpf(cpf))){
        // erro: se não houver registros cadastrados com esse CPF
        let msg = 'registro não encontrado!'
        areaResult.innerHTML = msg
        areaResult.style.color = 'red'
    } else { // fluxo principal
        let msg = 'registro encontrado! <br/> <br/>'
        areaResult.innerHTML = msg
        areaResult.style.color = 'green'

        let selecao = window.document.createElement('select')
        selecao.setAttribute('id', 'registro')
        selecao.setAttribute('size', '3')
        
        let chaves = ['nome: ', 'CPF: ', 'número: ']

        let itens = [1,2,3]
        for (let i in itens){
            itens[i] = document.createElement('option')
            itens[i].innerHTML = chaves[i] + Object.values(reg)[i]
            selecao.appendChild(itens[i])
        }
        areaResult.appendChild(selecao)
    }
}

function procurarPorCpf(cpf){ // procura o registro com o cpf indicado
    for (let x in registros){
        if (registros[x].cpf == cpf){
            return registros[x]
        }
    }
    return null
}
