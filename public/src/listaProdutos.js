export function listaProdutos(){
    const url = 'http://localhost:3000/produtos';
    const options = {
        method: 'GET',
        mode: 'cors',
        Headers: {
            'content-type':'application/json;charset=utf-8'
        }
    }
<<<<<<< HEAD
    // vou bulinar aqui
=======
//TOP TPOTPEOPEADNAOKNC AKNFA OWAKXAPWOCLKNLSDLKSLDKFSEEE
    //TESTE

>>>>>>> 6ad7cb1f4a7f47f897a2b942e7dd9720725f4bfc
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

function criaLinha(_id, nome, quant, validade, funcao){
    const linha = document.createElement('tr')
    const conteudo = `<td>${nome}</td>
                        <td>${funcao}</td>
                       
                        <td>${quant}</td>
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