const Sequelize = require('sequelize')


const db = new Sequelize (
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'postgres'
    }
)

module.exports = db;