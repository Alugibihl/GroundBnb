'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1086 Robbs Flat Road',
        city: 'East Haakon',
        state: 'South Dakota',
        country: 'United States',
        lat: 44.651190,
        lng: -101.263090,
        name: 'Hamilton Hillside',
        description: 'A hillside shack perfect for hikers and those who like to venture off the beaten track',
        price: 650.00
      },
      {
        ownerId: 2,
        address: '12421 Oceanview Way',
        city: 'Carey',
        state: 'Florida',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Carribean Cozy',
        description: 'Experience the ocean like never before by sleeping in it!',
        price: 1200.00
      },
      {
        ownerId: 3,
        address: '8201 Co Rd 59',
        city: 'Verbena',
        state: 'Alabama',
        country: 'United States',
        lat: 32.752650,
        lng: -86.512180,
        name: 'Alabama Adventure',
        description: 'Small town vibes, small town adventures',
        price: 350.00
      },
      {
        ownerId: 1,
        address: '311 E Market Street Suite 107',
        city: 'Lima',
        state: 'Ohio',
        country: 'United States',
        lat: 40.742550,
        lng: -84.105225,
        name: 'Vibe Vacay',
        description: "A coffee lover's dream getaway",
        price: 450.00
      },
      {
        ownerId: 2,
        address: '3451 S Malibu Terrace',
        city: 'San Diego',
        state: 'California',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Califordya',
        description: "Welcome to what may be the most affordable option here in sunny California, step away from electronics, and cleanse your mind and heart. (No Phone Reception)",
        price: 150.00
      },
      {
        ownerId: 3,
        address: '123 2nd st',
        city: 'New Bremen',
        state: 'Oregon',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Stay Weird New Bremen',
        description: "We were the orginal Oregon City to take on the moniker stay weird, now you can be one of the lucky people who get to see why.",
        price: 350.00
      },
      {
        ownerId: 1,
        address: '1833 East Merry St',
        city: 'Richmondish',
        state: 'Kentucky',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Kentucky Derby',
        description: "Run with the horses, make some moonshine, do backflips with racoons, the possibilities are endless if you don't get caught. (Drive past the no tresspassing signs.)",
        price: 50.00
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options);

  }
};
