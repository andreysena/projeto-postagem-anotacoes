//Carregando o módulo express (parte 1 da aula)
const express = require('express')

//Carregando o módulo express
const bodyParser = require('body-parser')

//Criando a variável que recebe a instância do express (parte 1 da aula)
const app = express()

//Carregando o módulo express-handlebars
const handlebars = require('express-handlebars')

//Carregando o arquivo com as informações da tabela de postagens
const Post = require('./models/Post')

// CONFIG
    // TEMPLATE ENGINE
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // BODY PARSER
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// ROTAS
    app.get('/', (req, res) => (
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => (
           res.render('home', {posts: posts}) 
        ))
        
    ))

    app.get('/cad', (req, res) => (
        res.render('formulario')
    ))

    app.post('/add', (req, res) => (
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then( () =>{
            res.redirect('/')
        }).catch( (erro) => {
            res.send("Houve um erro: " + erro)
        })
    ))
    
    app.get("/deletar/:id", (req, res) => (
        Post.destroy({where: {'id': req.params.id}})
        .then(() => {
            res.redirect('/')
        }).catch( (erro) => (
            res.send("Essa postagem não existe!")
        ))
    ))

//Iniciando o servidor com o express e indicando a porta (parte 1 da aula)
app.listen(8081, () => (
console.log('O servidor está rodando em: http://localost:8081')
)) //tudo relacioando ao express deve ser inserido acima desta linha












// //Criando rotas para a aplicações (parte 1 da aula)
// app.get('/', (req, res) =>(
//     res.sendFile(__dirname + "/pages/index.html")
// ))

// app.get('/sobre', (req, res) => (
//     res.sendFile(__dirname + "/pages/sobre.html")
// ))

// app.get('/blog', (req, res) => (
//     res.send('Bem Vindo ao meu blog')
// ))

// //Criando uma rota para dar boas vindas utilizando parâmetros (parte 2 da aula)
// app.get('/ola/:nome/:sobrenome/:idade', (req, res) => (

//     res.send("<h1>Olá, " + req.params.nome + " " + req.params.sobrenome +"</h1>"+"<h2> Sua idade é: " + req.params.idade + " anos</h2>")
// ))



