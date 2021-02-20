const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    },
    status: {
        type: db.Sequelize.STRING,
        defaultValue: "A"
    }
})

/* Se o arquivo for executado com a linha abaixo não comentada, haverá uma verificação
da existência das tabelas definidas nas linhas acima. Se as tabelas já existirem,
serão excluídas e recriadas. Sendo assim, a linha abaixo deve ser comentada após a 
primeira execução do arquivo para não haver a perda dos registros das tabelas. */

//Post.sync({force: true})

module.exports = Post