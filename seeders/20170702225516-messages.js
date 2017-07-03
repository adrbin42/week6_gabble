'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    .bulkCreate([
      {

      },
    ]);

    User.bulkCreate([{
    username: 'Emerson',
    role: 'admin',
    isActive: false
}, {
    username: 'Grey',
    role: 'user',
    isActive: true
}, {
    username: 'Keelan',
    role: 'admin',
    isActive: true
}]).then(function() {
    return User.findAll();
}).then(function(users){
    console.log(users) // Returns an array of user objects.
});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
