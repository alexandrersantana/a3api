export function listaProdutosCliente(){
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

function criaLinha(_id, nome, quantidade, validade, funcao){
    const linha = document.createElement('tr')
    const conteudo =   `<td>${nome}</td>
                        <td>${funcao}</td>
                        <td>${quantidade}</td>
                        <td>${validade}</td>`

    linha.innerHTML = conteudo
    linha.dataset.id = nome
    return linha
}

const lista = document.querySelector('[data-tabela]')

async function render() {
    try{
        const produtos = await listaProdutosCliente()
        produtos.forEach(produto => {
            lista.appendChild(criaLinha(produto._id, produto.nome, produto.quant, produto.validade, produto.funcao))
        });
    }catch(e){
        console.log(e);
    }
}

render();