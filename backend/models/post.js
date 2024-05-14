const Sequelize = require('sequelize');
const db = require('./index');
const CrawlingSet = require('./crawling_set');

const Post = db.define('posts',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    crawlingSetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: CrawlingSet,
            key: 'id'
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dateCreated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

Post.belongsTo(CrawlingSet, { foreignKey: 'crawlingSetId' });

module.exports = Post;