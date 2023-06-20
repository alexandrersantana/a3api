const session = require('express-session');

const sessionConfig = {
  secret: 'teste', // A chave você escolhe
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Defina como true se estiver usando HTTPS
    maxAge: 3600000 // Tempo de expiração do cookie em milissegundos (1 hora no exemplo)
  }
};


module.exports = session(sessionConfig);