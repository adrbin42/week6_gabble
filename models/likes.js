'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    msgid: DataTypes.STRING,
    userid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.messages, { as: 'usermessages', through: 'likes', foreignKey: 'userid' })
        messages.belongsToMany(models.users, { as: 'usernames', through: 'likes', foreignKey: 'msgid' })
      }
    }
  });
  return likes;
};
