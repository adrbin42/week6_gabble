'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    msgid: DataTypes.STRING,
    userid: DataTypes.STRING
  }, {});

  likes.associate = function(models) {
    likes.belongsTo(models.users, { as: 'user', through: 'likes', foreignKey: 'userid' })
    likes.belongsTo(models.messages, { as: 'messages', through: 'likes', foreignKey: 'msgid' })
  }

  return likes;
};
