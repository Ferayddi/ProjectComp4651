const Sequelize = require('sequelize');
const db = require('./index');
const User = require('./user');

const Post = db.define('posts',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
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

Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;