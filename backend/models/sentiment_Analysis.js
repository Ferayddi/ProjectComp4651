const Sequelize = require('sequelize');
const db = require('./index');
const Post = require('./post');

const SentimentAnalysis = db.define('sentiment_analysis', {
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
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    mean: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    stddev: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    min: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    max: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    q1: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    median: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    q3: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    IQR: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    positiveCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    negativeCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

SentimentAnalysis.belongsTo(Post, { foreignKey: 'id' });

module.exports = SentimentAnalysis;