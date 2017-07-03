'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {

    return queryInterface.addConstraint('messages',['userid'],{
        type: 'FOREIGN KEY',
        references: {
          table: 'messages',
          field: 'target_column_name'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
  }

  down: function(queryInterface, Sequelize) {

    return queryInterface.removeConstraint('messages',['userid'],{

    });
  }
};
