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
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F74%2Ff0%2F5d%2F74f05d22e2bf44fcbafa53f99c94046b.jpg&f=1&nofb=1&ipt=f1d008c73da9570f9004c7e9d6563ecb039a5a57b5080b9b67410961ebd92b67&ipo=images',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fabandoned-village-made-cave-houses-which-located-mardin-turkey-hills-city-134881353.jpg&f=1&nofb=1&ipt=daae127acd29ff5',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Facidcow.com%2Fpics%2F20110708%2Funderwater_caves_11.jpg&f=1&nofb=1&ipt=ec8a1883d21818f4415f30acf7b78b2c25efa7edbe25c8e930ad71d113d7fa07&ipo=images',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F2e56892f6a349ad471920%2Fhttps%2Fmedia.gannett-cdn.com%2F29906170001%2F29906170001_5716851009001_5716851192001-vs.jpg%3F',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbuyalabamaland.com%2Fwp-content%2Fuploads%2F2017%2F07%2FEntrance-768x576.jpg&f=1&nofb=1&ipt=91642872088fb7e96cd0ce718de00826135b4e9e159ed7a4a253cbd910a63376&ipo=images',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbuyalabamaland.com%2Fwp-content%2Fuploads%2F2017%2F07%2FStairway-682x540.jpg&f=1&nofb=1&ipt=3b679ef69d1c4784546a7b11607364989d556cc658113a6356e5c656e50b858c&ipo=images',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Fdisp%2F143d2442672887.56072876a1a11.jpg&f=1&nofb=1&ipt=b794b8aa4d7eaf6bcd3d8e7ccaeabafb037575f1b3a11580640849120163ff38&ipo=images',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2Fd7%2F3b%2Fa3d73b45c88666298d8b99c011ab42e9.jpg&f=1&nofb=1&ipt=ea1976fb495e74a990ea18abe84e7b57a8b82db1cb74d8bdf2af9e75364cb5b6&ipo=images',
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
