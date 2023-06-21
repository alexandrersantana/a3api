//import {listaProdutos} from './listaProdutos'

const pegaURL = new URL(window.location);
const id = pegaURL.searchParams.get('id');

const inputNome = document.querySelector('[data-nome]');
const inputFuncao = document.querySelector('[data-funcao]');
const inputPaciente = document.querySelector('[data-paciente]');
const inputValidade = document.querySelector('[data-validade]');
const inputQuantidade = document.querySelector('[data-quant]');
const inputId = document.querySelector('[data-id]')

function getProduto(id){
    const url = `http://localhost:3000/getProduto?_id=${id}`;
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

async function getProdutoInfo(){
    try{
        const dados = await getProduto(id).then(result => result)
        console.log(dados[0]._id);

        inputId.value = dados[0]._id
        inputNome.value = dados[0].nome
        inputFuncao.value = dados[0].funcao
        inputPaciente.value = dados[0].paciente
        inputValidade.value = dados[0].validade
        inputQuantidade.value = dados[0].quant
    }catch(e){
        console.log(e);
    }
}

getProdutoInfo()