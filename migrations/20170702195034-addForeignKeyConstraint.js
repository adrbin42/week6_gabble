'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('messages',['userid'], {
      type:'FOREIGN KEY',
      references: {
        table:'users',
        field:'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('messages','userid');
  }
};
