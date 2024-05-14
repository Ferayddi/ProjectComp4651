const Sequelize = require('sequelize');
const db = require('./index');
const Post = require('./post');

// this is the list of all possible NER tags
// ('CARDINAL', 'DATE', 'EVENT', 'FAC', 'GPE', 'LANGUAGE', 'LAW', 'LOC', 'MONEY', 'NORP', 'ORDINAL', 'ORG', 'PERCENT', 'PERSON', 'PRODUCT', 'QUANTITY', 'TIME', 'WORK_OF_ART')

const NERAnalysis = db.define('ner_analyses', {
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
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    date: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    event: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    fac: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    gpe: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    language: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    law: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    loc: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    money: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    norp: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    ordinal: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    org: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    percent: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    person: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    product: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    quantity: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    time: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    work_of_art: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    }
});

NERAnalysis.belongsTo(Post, { foreignKey: 'id' });

module.exports = NERAnalysis;