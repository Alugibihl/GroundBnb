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
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fabandoned-village-made-cave-houses-which-located-mardin-turkey-hills-city-134881353.jpg&f=1&nofb=1&ipt=daae127acd29ff5d68acad39e57207fe12fe0c9a1aaa592bcb866cff2914a824&ipo=imagesl',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Facidcow.com%2Fpics%2F20110708%2Funderwater_caves_11.jpg&f=1&nofb=1&ipt=ec8a1883d21818f4415f30acf7b78b2c25efa7edbe25c8e930ad71d113d7fa07&ipo=images',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F2e56892f6a349ad47192b530425d443fb365e5e9%2Fr%3Dx1803%26c%3D3200x1800%2Fhttps%2Fmedia.gannett-cdn.com%2F29906170001%2F29906170001_5716851009001_5716851192001-vs.jpg%3FpubId%3D29906170001&f=1&nofb=1&ipt=46957868c1192011df24bcb3623b2867e33242a146bf56a87e8444625f735448&ipo=images',
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
      {
        spotId: 5,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fj23ikh09iddz.jpg&f=1&nofb=1&ipt=76650cda2cdc84d8456f60846bd3d87b5199a5785e93ede4928f2e7892acceac&ipo=images',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FdOeTZfOF8K8%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=baa0780b579efa99caf52ae4cc856e3e7ed8da776b4a1084bab2700c99800f66&ipo=images',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4d%2Fc1%2F07%2F4dc1072f958c790d213f77d8d7d86d04.jpg&f=1&nofb=1&ipt=46cd9e7845daa26f6439a2132e0bd1b3c238ed6c368eabef311d31710c9b4b16&ipo=images',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlyinyourstate.com%2Fwp-content%2Fuploads%2F2018%2F01%2FScreen-Shot-2018-01-22-at-4.24.06-PM-700x415.png&f=1&nofb=1&ipt=cec2d9bbdef0a729bcb8e15b14ca99d59420e6e4f4313f7125231b565981e253&ipo=images',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2014%2F08%2F10%2Frealestate%2F10dealcover%2F10dealcover-master675-v2.jpg&f=1&nofb=1&ipt=907ff7d39721f3ef52886fc888bbab4b0f43eeddd37e37c43e5b81f7267cdd01&ipo=images',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.denverpost.com%2Fwp-content%2Fuploads%2F2016%2F05%2Fkentucky-cave.jpg%3Fw%3D660&f=1&nofb=1&ipt=f557c3b85c9b7e0d6da98ba9cc8bbda96d16846546b9af248060d86411f13936&ipo=images',
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
