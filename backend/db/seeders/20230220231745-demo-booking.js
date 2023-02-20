'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-12-12",
        endDate: "2023-12-25"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-12-12",
        endDate: "2023-12-25"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-10-05",
        endDate: "2023-10-17"
      },
    ], {})

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options);

  }
};
