//Carregando o módulo express
const express = require('express')

//Carregando o módulo express
const bodyParser = require('body-parser')

//Criando a variável que recebe a instância do express
const app = express()

//Carregando o módulo express-handlebars
const handlebars = require('express-handlebars')

//Carregando o arquivo com as informações da tabela de postagens
const Post = require('./models/Post')
const { sequelize } = require('./models/db')

// CONFIG
    // TEMPLATE ENGINE
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // BODY PARSER
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// ROTAS
    app.get('/', (req, res) => (
        Post.findAll(
            {
                attributes: [
                    'id',
                    'titulo',
                    'conteudo',
                    [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('createdAt'), '%d/%m/%y %H:%i'), 'createdAt']
                ],
                order: [['id', 'DESC']],
                where: {'status': 'A'}

            }).then((activeNotes) => {
           res.render('home', {activeNotes: activeNotes}) 
        })
        
    ))

    app.get('/lixeira', (req, res) => {
        Post.findAll(
            {
                attributes: [
                    'id',
                    'titulo',
                    'conteudo',
                    [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('updatedAt'), '%d/%m/%y %H:%i'), 'updatedAt']
                ],
                order: [['id', 'DESC']], 
                where: {'status': 'I'}
            }
        ).then((inactiveNotes) => {
            res.render('lixeira', {inactiveNotes: inactiveNotes}) 
         })
    })

    app.get('/cad/:id?', (req, res) => {
        let id = req.params.id
        if(id){
            Post.findByPk(req.params.id).then((notes) => {
                res.render('formulario', {notes: notes})
            })
        }else{
            res.render('formulario')
        }
        
    })

    app.post('/add', (req, res) => {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then( () =>{
            res.redirect('/')
        }).catch( (erro) => {
            res.send("Houve um erro: " + erro)
        })
    })
    
    app.get('/delete/:id', (req, res) => {
        Post.update(
            {
                status: "I"
            },
            {returning: true, where: {id: req.params.id}}
        ).then(() => (
            res.redirect('/')
        )).catch((erro) => (
            console.log("Ocorreu um erro ao tentar excluir: " + erro)
        ))
        
    })

    app.post('/update/:id', (req, res) => {
        Post.update(
            {
                titulo: req.body.titulo,
                conteudo: req.body.conteudo
            },
            {returning: true, where: {id: req.params.id}}
        ).then(()=>{
            res.redirect('/')
        })
    })

    app.post('/restore/:id', (req, res) => {
        Post.update(
            {
                status: "A"
            },
            {returning: true, where: {id: req.params.id}}
        ).then(() => {
            res.redirect("/lixeira")
        }).catch((erro) => {
            console.log("Ocorreu um erro ao tentar restaurar a anotação: " + erro)
        })
    })

//Tudo relacioando ao express deve ser inserido acima desta linha
//Iniciando o servidor com o express e indicando a porta
app.listen(8081, () => (
console.log('O servidor está rodando em: http://localhost:8081')
))
