//Importando o sequelize
const Sequelize = require('sequelize')

// CONEXÃO COM O BANCO DE DADOS MYSQL
const sequelize = new Sequelize('postapp', 'root', 'sena1265', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false //for reading from database
    },
    timezone: '-03:00'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}