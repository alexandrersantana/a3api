export function listaProdutos(){
    const url = 'http://localhost:3000/produtos';
    const options = {
        method: 'GET',
        mode: 'cors',
        Headers: {
            'content-type':'application/json;charset=utf-8'
        }
    }

    return fetch(url, options).then(
        resp => resp.json()
    ).then(
        data => {
            console.log(data);
            return data
        }
    )
}

function deletar(_id){
    return fetch(`http://localhost:3000/deletar?id=${_id}`, {
        method: 'DELETE'
    }).then(resultado =>{
        if(!resultado.ok) console.log('não foi possível remover');
    })
}

function criaLinha(_id, nome, quantidade, validade, funcao, paciente){
    const linha = document.createElement('tr')
    const conteudo = `<td>${nome}</td>
                        <td>${funcao}</td>
                        <td>${paciente}</td> 
                        <td>${quantidade}</td>
                        <td>${validade}</td>
                        <td>
                            <a href="http://localhost:3000/editar?id=${_id}">
                            <button>Editar</button>
                            </a>
                            <button class="btn-deletar" onClick="window.location.reload()">Deletar</button>   
                        </td>`

    linha.innerHTML = conteudo
    linha.dataset.id = nome
    return linha
}


const lista = document.querySelector('[data-tabela]')
lista.addEventListener('click', async(evento) => {
    let botaoDeletar = evento.target.className == 'btn-deletar'

    if(botaoDeletar){
        try{
            const linhaProduto = evento.target.closest('[data-id]')
            let id = linhaProduto.dataset.id
            console.log(id);
            await deletar(id);
        }catch(e){
            console.log("erro ao deletar");
        }
    }
    
})

async function render() {
    try{
        const produtos = await listaProdutos()
        produtos.forEach(produto => {
            lista.appendChild(criaLinha(produto._id, produto.nome, produto.quant, produto.validade, produto.funcao, produto.paciente))
        });
    }catch(e){
        console.log(e);
    }
}

render();