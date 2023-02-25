'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'images.url',
        preview: true
      },
      {
        spotId: 1,
        url: 'images2.url',
        preview: false
      },
      {
        spotId: 2,
        url: 'photo.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'photo.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'pic.url',
        preview: true
      },
      {
        spotId: 3,
        url: 'pic2.url',
        preview: false
      },
      {
        spotId: 4,
        url: 'pic.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'pic2.jpeg',
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
