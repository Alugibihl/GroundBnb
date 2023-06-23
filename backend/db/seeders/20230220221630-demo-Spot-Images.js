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
        spotId: 1,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F01%2F209172-landscape-mountain-cave.jpg&f=1&nofb=1&ipt=e3eea53e15f505945a08a8008c80769e53710b75bb89b4500c3bdfb594ad758a&ipo=images",
        preview: false
      },
      {
        spotId: 1,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.travelawaits.com%2Fta%2Fuploads%2F2021%2F04%2Ff746c08b92dbef4cc3642e8675e7ef746c0-2048x2048.jpg&f=1&nofb=1&ipt=9a693d40e4aeb7a536be03b50a27677595a8013728c1353757455c0406b83982&ipo=images",
        preview: false
      },
      {
        spotId: 1,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.fxbfJk8KoabGEJaimQQ4BAHaE8%26pid%3DApi&f=1&ipt=9d012fa4cbabef0d56a13adaf293e00f50ad8ea664f3b5a19a453ebc262761cf&ipo=images",
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
        spotId: 2,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wallpapersafari.com%2F65%2F54%2FfDkmOH.jpg&f=1&nofb=1&ipt=228fe1a03a09a86723a0d2610958d4b9846739246246bef66a58e538ae3c7e11&ipo=images",
        preview: false
      },
      {
        spotId: 2,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4039976.jpg&f=1&nofb=1&ipt=0bf3761083bf364bd965ffb35b317a4e8fd233035a5c39eb838776e743242eee&ipo=images",
        preview: false
      },
      {
        spotId: 2,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fyesofcorsa.com%2Fwp-content%2Fuploads%2F2017%2F04%2FUnderwater-Caves-Wallpaper-1080p.jpg&f=1&nofb=1&ipt=d05e696d8af0db32900e22bc5d8b8b63542d90b4e53775146e4ffab2c0eea531&ipo=images",
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
        spotId: 3,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.landtrust-hsv.org%2Fwp-content%2Fuploads%2F2019%2F09%2FHuntsville.jpg&f=1&nofb=1&ipt=34a61dee882d0b3c5bdecf1fedd3c12eb3f218f428d3b9a37fc89211311c48ae&ipo=images",
        preview: false
      },
      {
        spotId: 3,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fbhamnow.com%2Fwp-content%2Fuploads%2F2020%2F10%2Fstephens-gap-cave.jpg%3Fresize%3D750%252C393%26ssl%3D1&f=1&nofb=1&ipt=fe2e05434493aaf9e7d88577b600495483908b275264049cc3f2b030924fdc15&ipo=images",
        preview: false
      },
      {
        spotId: 3,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fdd79GDREiKA%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=9db57604490deebbca4118b967f9c285b41458b63419f5c9e4171f6f0ea87ae1&ipo=images",
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
        spotId: 4,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fprojects%2F404%2F5408821.546718a7501ef.jpg&f=1&nofb=1&ipt=72b1da4e2f6534378fcb997bea9e99670281dbb0c0110e78df1a432bb6941bc2&ipo=images",
        preview: false
      },
      {
        spotId: 4,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F_Ce6cvRGOe8E%2FTRmqgMiuUqI%2FAAAAAAAAAJU%2FozQGKpGTZI8%2Fs1600%2FThe-Cave-Restaurant-by-Koichi-Takada-Architects.jpg&f=1&nofb=1&ipt=a7c017add0baa3a82ffd623a632b479f201d8842ebc29da1b13eb8c5f6ccc99f&ipo=images",
        preview: false
      },
      {
        spotId: 4,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fad%2Fb4%2F33%2Fadb4338a7e944b0460d8e30f8fff35fd.jpg&f=1&nofb=1&ipt=08ea6ef0b9a09d715c4737c6a11d460615278afc411f17f8f78d6826ba12794c&ipo=images",
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
        spotId: 5,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fuponarriving.com%2Fwp-content%2Fuploads%2F2015%2F03%2Fbenagil-sea-cave.jpg&f=1&nofb=1&ipt=2ecc8883c3704373b8dcbbaf40e1d1b9683c6a80535a8de35fc40b34e069acd6&ipo=images",
        preview: false
      },
      {
        spotId: 5,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages4.alphacoders.com%2F815%2Fthumb-1920-815678.jpg&f=1&nofb=1&ipt=144ced94b57f0edb6433ecfaf3d0b5fcad887f099747eeda0cbc942b232f2910&ipo=images",
        preview: false
      },
      {
        spotId: 5,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages7.alphacoders.com%2F787%2F787321.jpg&f=1&nofb=1&ipt=585b217a133194c9dbc505731dd0e078ae83e0a035dc82ae0ecce4e334be40f4&ipo=images",
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
        spotId: 6,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmikeandlauratravel.com%2Fwp-content%2Fuploads%2F2019%2F03%2FIMG_20171108_120828-2-1024x768.jpg&f=1&nofb=1&ipt=ea6e558be0946b4dc07bfcc3245e1c7f0cd1ba84a8347ae2200122a240c820be&ipo=images",
        preview: false
      },
      {
        spotId: 6,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-kXhIcltnHFo%2FTt7La0twokI%2FAAAAAAAADSc%2FmZuBQjnZAnc%2Fs1600%2F1.jpg&f=1&nofb=1&ipt=176621b7c86dd06b14f3198dfd883b443ecaebb17b786506841cfa5cedf288a9&ipo=images",
        preview: false
      },
      {
        spotId: 6,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.carfulofkids.com%2Fwp-content%2Fuploads%2F2017%2F06%2FOregon-Caves.jpg&f=1&nofb=1&ipt=30b04348b3adaef24130ddc26f7dcf22bc21d513f6c41c12fbf169c554cba4a1&ipo=images",
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
      {
        spotId: 7,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobalnews.ca%2Fwp-content%2Fuploads%2F2016%2F05%2Fkentucky-cave-1.jpg%3Fquality%3D85%26strip%3Dall%26w%3D720%26h%3D379%26crop%3D1&f=1&nofb=1&ipt=c8043e544fc8e6cff1725a27c6e4f116a7be99688013cd3d05e04844ea30e41b&ipo=images",
        preview: false
      },
      {
        spotId: 7,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.abcotvs.com%2Fdip%2Fimages%2F1359669_Kentucky%2520hidden%2520cave.jpg%3Fw%3D1280%26r%3D16%3A9&f=1&nofb=1&ipt=f60a79303d83c4701a6e4ae855433efeafec3a9d762026c70eac774e51795f42&ipo=images",
        preview: false
      },
      {
        spotId: 7,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.anywheretraveler.com%2Fwp-content%2Fuploads%2F2013%2F11%2Fmammoth-cave-entrance.jpg&f=1&nofb=1&ipt=ccf7b2c7a350b314cc4a84cafb7980ad0f4a0a07ab72afe5c92dae410e4221b7&ipo=images",
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
