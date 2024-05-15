const Sequelize = require('sequelize');
const db = require('./index');
const User = require("./user");

const DataSet = db.define('datasets',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    datasetName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datasetSize: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    datasetSizeUnit: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datasetUrl: {
        type: Sequelize.STRING,
        allowNull:false
    }
});

DataSet.belongsTo(User);

module.exports = DataSet;