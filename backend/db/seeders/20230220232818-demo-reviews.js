'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: 'Clean, pretty',
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Could use some love',
        stars: 3
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Glad we came, will definitely come again',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Waste of money, avoid this place',
        stars: 1
      }, {
        spotId: 4,
        userId: 3,
        review: 'I think this is just a coffee shop, the let me sleep in a chair, good coffee',
        stars: 3
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options);
  }
};
