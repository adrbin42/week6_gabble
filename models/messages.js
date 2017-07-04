'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    title: DataTypes.STRING,
    message: DataTypes.STRING(140),
    userid: DataTypes.INTEGER
  },{});

      messages.associate = function(models) {
          messages.belongsTo(models.users,{as:'usermessages', foreignKey:'userid'});
        }

  return messages;
};
