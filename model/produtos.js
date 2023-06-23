const mongoose = require('mongoose');

let produtos = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    // nome: {
    //     type: String,
    //     required: true
    // },
    funcao: {
        type: String,
        required: false
    },
    validade: {
        type: String,
        required: true
    },
    quant: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

let Produtos = module.exports = mongoose.model('produtos', produtos)