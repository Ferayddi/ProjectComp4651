const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');

const CrawlingSet = db.define('crawling_sets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    dateCreated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

CrawlingSet.belongsTo(User, { foreignKey: 'userId' });

module.exports = CrawlingSet;
