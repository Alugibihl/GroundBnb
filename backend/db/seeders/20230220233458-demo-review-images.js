'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'hillImages.url',
      },
      {
        reviewId: 2,
        url: 'Oceanimage.jpeg',
      },
      {
        reviewId: 3,
        url: 'alabamaImages.jpeg',
      },
      {
        reviewId: 4,
        url: 'coffeeImage.url',
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options);
  }
};
