document.querySelector('input#btncalc').
addEventListener('click', calcular) // evento do clique no botão

function calcular(){

    var caixa = document.querySelector('input#txtnum')
    
    if (caixa.value.length == 0){ // se usuário não escolheu o número
        alert('[ERRO] nenhum número escolhido')
        // return
    } else {
        var num = Number(caixa.value)
        var texto = String()
        var res = Number()
        var c = 1
        
        while (c <= 10){
            res = num*c
            texto += `${adapt(num)} x ${c} = ${adapt(res)} <br/>`
            c++
        }
        
        var resp = window.document.getElementsByTagName('section')[1]
        resp.innerHTML = texto

        resp.style.font = 'normal 18pt tahoma'
    }
}

function adapt(n){
    return (n>=0?n:`(${n})`)
}