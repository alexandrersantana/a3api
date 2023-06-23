const mongoose = require('mongoose');

let users = mongoose.Schema({//usado para gerar objetos de cadastro no bd
    
    id: {
        type: String,
        required: true
    },
    typeUser: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: function(){
            return this.typeUser == 'cliente'; // O campo é obrigatório se o typeUser for cliente (pessoa fisica)
        }
    },
    cpf: {
        type: String,
        required: function(){
            return this.typeUser == 'cliente'; // O campo é obrigatório se o typeUser for cliente (pessoa fisica)
        }
    },
    cnpj: {
        type: String,
        required: function(){
            return this.typeUser == 'farmacia'; // O campo é obrigatório se o typeUser for falso (pessoa juridica)
        }
    },
    fantasia: {
        type: String,
        required: function(){
            return this.typeUser == 'farmacia'; // O campo é obrigatório se o typeUser for falso (pessoa juridica)
        }
    },
    bairro: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
  })

  let Usuario = module.exports = mongoose.model('users', users)