'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        users.hasMany(models.messages, {as: 'messages', foreignKey: 'userid'})
      }
    }
  });
  return users;
};
