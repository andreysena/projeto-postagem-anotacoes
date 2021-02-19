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

// Post.sync({force: true})

module.exports = Post