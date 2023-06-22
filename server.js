const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alexandrersantana:102635@cluster0.hzepzb9.mongodb.net/?retryWrites=true&w=majority";
//teste de comentário TRES

const sessionMiddleware = require('./sessionConfig')
app.use(sessionMiddleware);

const mongoose = require('mongoose')
mongoose.connect(uri)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/src', express.static(__dirname + 'public/src'))

MongoClient.connect(uri, (err, client) => {
    if(err) return console.log(err)
    db = client.db('test')
    setupRoutesAndStartServer(db)
})
// Tem que fazer funcionar essa função para bloquear as outras paginas!! Senão o login fica podi xD
function isAuthenticated(req, res, next) {
    // Verificar se o usuário está autenticado
    if (req.session && req.session.authenticated) {
      // O usuário está autenticado, permitir acesso à próxima rota
      return next();
    }
  
    // Redirecionar para a página de login caso contrário
    res.redirect('/login');
  }

  function buscarDados() {
    const cnpj = '1234567890'; // CNPJ que deseja buscar (pode ser obtido de um campo de formulário, por exemplo)
  
    const url = `http://localhost:3000/dados?cnpj=${cnpj}`; // URL do seu endpoint GET
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Faça o que for necessário com os dados recebidos
        console.log(data);
        // Exiba os dados na página, atualize elementos, etc.
      })
      .catch(error => {
        console.error(error);
        // Lide com erros, exiba uma mensagem de erro na página, etc.
      });
  }
  

function setupRoutesAndStartServer(db) {

app.get('/home', isAuthenticated, (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('home.ejs')
})

app.get('/cadastro', isAuthenticated, (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('cadastroProduto.ejs')
})

app.get('/listaProdutos', isAuthenticated, (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('listaProdutos.ejs')
})

app.get('/editar', isAuthenticated, (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
    //res.render('index.ejs')
    res.render('editar.ejs')
})

app.get('/', (req, res) => {
    res.redirect('/login');
  });

app.get('/login', (req, res) =>{//READ: ENVIA A INFORMAÇÃO
    res.render('login.ejs')
})

app.get('/cadastroCnpj', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
  res.render('cadastroCnpj.ejs')
})

app.get('/cadastroCliente', (req, res) =>{ //READ: ENVIA A INFORMAÇÃO
  res.render('cadastroCliente.ejs')
})


const Produtos = require('./model/produtos');
const { ObjectId } = require('mongodb');

app.get('/produtos', (req, res) =>{
    let listaProdutos = Produtos.find({}, function(err, produtos){
        if(err) console.log(err);
        res.json(produtos)
    })
})

app.get('/getProduto', (req, res) =>{
    let listaProdutos = Produtos.find({"_id": req.query._id}, function(err, produtos){
        if(err) console.log(err);
        res.json(produtos)
    })
})

app.get('/dados', (req, res) => {
  const cnpj = req.query.cnpj; // Obtém o CNPJ do parâmetro da URL ou de onde estiver armazenado

  const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`; // URL da API

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // ...faça o que for necessário com os dados recebidos da API...

      res.json(data); // Responda com os dados recebidos da API
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Erro ao fazer solicitação à API' });
    });
});


app.post('/show', (req, res) => {
    db.collection('produtos').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Salvo com sucesso')
        res.redirect("/home")
    })
    
})

app.post('/atualizaProduto', async (req, res) =>{
    console.log(req.body._id);
    const filter = {"_id": ObjectId(req.body._id)}
    await Produtos.findByIdAndUpdate(ObjectId(req.body._id), {$set:{
        id: req.body._id,
        nome: req.body.nome,
        funcao: req.body.funcao,
        paciente: req.body.paciente,
        validade: req.body.validade,
        quant: req.body.quant
    }})
    
    res.redirect('/listaProdutos')
})

app.delete('/deletar', (req, res) =>{
    console.log(req.query._id);
    db.collection('produtos').deleteOne({"id": req.query._id});
})

// Login

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Verifique se o nome de usuário e a senha estão corretos no banco de dados
    db.collection('users').findOne({ username: username, password: password}, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Erro no servidor'});
      } else if (!user) {
        res.status(401).json({ error: 'Nome de usuário ou senha inválidos'});
      } else {
        // Autentica o cliente para acessar as páginas bloqueadas
        req.session.authenticated = true;
        
        const userId = user._id;
        const typeUser = user.typeUser;
  
        if (typeUser == true) {
          // Usuário do tipo A, redirecione para a página A passando o ID do usuário
          res.redirect(`/listaProdutos?id=${userId}`);
        } else if (typeUser == false) {
          // Usuário do tipo B, redirecione para a página B passando o ID do usuário
          res.redirect(`/home?id=${userId}`);
        } else {
          // Tipo de usuário desconhecido, redirecione para uma página de erro ou faça outra ação adequada
          res.status(400).json({ error: 'Tipo de usuário desconhecido' });
        }
      }
    });
  });

  app.listen(3000, function(){
    console.log('server running on port 3000')
})
}
