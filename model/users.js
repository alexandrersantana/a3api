const mongoose = require('mongoose');

let users = mongoose.Schema({
    
    id: {
        type: String,
        required: true
    },
    typeUser: {
        type: Boolean,
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
            return this.typeUser; // O campo é obrigatório se o typeUser for falso (pessoa juridica)
        }
    },
    cnpj: {
        type: String,
        required: function(){
            return !this.typeUser; // O campo é obrigatório se o typeUser for falso (pessoa juridica)
        }
    },
    fantasia: {
        type: String,
        required: function(){
            return !this.typeUser; // O campo é obrigatório se o typeUser for falso (pessoa juridica)
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