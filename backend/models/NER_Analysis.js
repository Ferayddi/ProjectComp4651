const Sequelize = require('sequelize');
const db = require('./index');
const Post = require('./post');

const NERAnalysis = db.define('ner_analysis', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Post,
            key: 'id'
        }
    },
    cardinal: {
        type: Sequelize.JSON,
        allowNull: true
    },
    date: {
        type: Sequelize.JSON,
        allowNull: true
    },
    event: {
        type: Sequelize.JSON,
        allowNull: true
    },
    fac: {
        type: Sequelize.JSON,
        allowNull: true
    },
    gpe: {
        type: Sequelize.JSON,
        allowNull: true
    },
    language: {
        type: Sequelize.JSON,
        allowNull: true
    },
    law: {
        type: Sequelize.JSON,
        allowNull: true
    },
    loc: {
        type: Sequelize.JSON,
        allowNull: true
    },
    money: {
        type: Sequelize.JSON,
        allowNull: true
    },
    norp: {
        type: Sequelize.JSON,
        allowNull: true
    },
    ordinal: {
        type: Sequelize.JSON,
        allowNull: true
    },
    org: {
        type: Sequelize.JSON,
        allowNull: true
    },
    percent: {
        type: Sequelize.JSON,
        allowNull: true
    },
    person: {
        type: Sequelize.JSON,
        allowNull: true
    },
    product: {
        type: Sequelize.JSON,
        allowNull: true
    },
    quantity: {
        type: Sequelize.JSON,
        allowNull: true
    },
    time: {
        type: Sequelize.JSON,
        allowNull: true
    },
    work_of_art: {
        type: Sequelize.JSON,
        allowNull: true
    }
});

NERAnalysis.belongsTo(Post, { foreignKey: 'id' });

module.exports = NERAnalysis;