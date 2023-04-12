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
      },
      {
        spotId: 4,
        userId: 3,
        review: 'I think this is just a coffee shop, they let me sleep in a chair, good coffee',
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: 'This place is EXACTLY what I was looking for. There has been a big problem lately with finding places that let you step away from your phones, here gives you no choice.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 2,
        review: 'Weird, but a good weird. Very on brand and as advertized.',
        stars: 5
      },
      {
        spotId: 7,
        userId: 3,
        review: "I don't think this place is actually open to the public. Don't get caught.",
        stars: 2
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options);
  }
};
