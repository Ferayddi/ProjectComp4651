const Sequelize = require('sequelize');
const db = require('./index');

const User = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    userEmail: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;