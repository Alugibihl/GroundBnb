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
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.A10hjt9OT9VhF20JuMrjTQHaFj%26pid%3DApi&f=1&ipt=2757262a26d0051021d4912ee9d0b4a2e3796210947b7d806d487a30f13d9afe&ipo=images",
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
      {
        spotId: 8,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftheflighter.com%2Fwp-content%2Fuploads%2F2020%2F06%2Fmodern-cave-house.jpg&f=1&nofb=1&ipt=7d8aea32ad95d48d72b554ca3c605c0c187f3f0dc78485696d9c4b2c0280ff14&ipo=images",
        preview: true
      },
      {
        spotId: 8,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa5%2F06%2Ff4%2Fa506f45e9c7a0f933d16de632e17eba0.jpg&f=1&nofb=1&ipt=e11a5341416ef23d777de33e0f529e2fe9ed0f763bacd64ef0cee9f0985fb5f2&ipo=images",
        preview: false
      },
      {
        spotId: 8,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F35%2F5f%2F26%2F355f26909a8dd3a3b387985ca29ba500.jpg&f=1&nofb=1&ipt=506257829f067ff35c396f379473910a34983f9cf2587b24fe246fa38c5fe1c2&ipo=images",
        preview: false
      },
      {
        spotId: 8,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.XeXf0ossfAvHgdVU7jS7nAHaE8%26pid%3DApi&f=1&ipt=821cae924c38e683a61063f3a364ec039e7fc7097e7db718333f958658d150b6&ipo=images",
        preview: false
      },
      {
        spotId: 8,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Frock-cave-stadsaal-caves-art-site-cederberg-mountains-western-cape-province-south-africa-133708767.jpg&f=1&nofb=1&ipt=c5ea339a5e2320eec5ea919475ca1b20633fb142cdc7a585c284896a222ed6c3&ipo=images",
        preview: false
      },
      {
        spotId: 9,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.messynessychic.com%2Fwp-content%2Fuploads%2F2018%2F01%2F5831252310_f7f9f6433d_o.jpg&f=1&nofb=1&ipt=1d082f2cf9adac54b4dfee2530cd9bc1fa3668223d0ce5fe66d8f76aeba30592&ipo=images",
        preview: true
      },
      {
        spotId: 9,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FFsTQLO2Qj9A%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=1fd7c163b50c803770fc74874aaa19a6a662bc7c852a8e4a523efa860b8dbdde&ipo=images",
        preview: false
      },
      {
        spotId: 9,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fuploads.neatorama.com%2Fimages%2Fposts%2F797%2F92%2F92797%2F1475499309-2.jpg&f=1&nofb=1&ipt=e8dc8cc39e0ec989346f08a855a885fc6d4d3f31120dec054d4d607fe02a66e8&ipo=images",
        preview: false
      },
      {
        spotId: 9,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.centralparkstory.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fcave.jpg&f=1&nofb=1&ipt=30066b6be3d288de75f6bd8026732df8850b06be96441d6809a9a627af783761&ipo=images",
        preview: false
      },
      {
        spotId: 9,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.messynessychic.com%2Fwp-content%2Fuploads%2F2018%2F01%2Frockscetnralperk-930x619.jpg&f=1&nofb=1&ipt=c8b9891f33e56612018ef7f87f5e1e255b35195ef3b082b4e8c05349546e56ac&ipo=images",
        preview: false
      },
      {
        spotId: 10,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1546216307-269d144e0789%3Fixlib%3Drb-1.2.1%26ixid%3DeyJhcHBfaWQiOjEyMDd9%26auto%3Dformat%26fit%3Dcrop%26w%3D1000%26q%3D80&f=1&nofb=1&ipt=a6ddae14c51c80fa59460d3888cf9186cdf69652eba86887e52e57843df23a6c&ipo=images",
        preview: true
      },
      {
        spotId: 10,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp4695801.jpg&f=1&nofb=1&ipt=a82da869cacb274ddaa9919ae15b4dbfff48af07df6ca8c48f3daedecc09333d&ipo=images",
        preview: false
      },
      {
        spotId: 10,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fb6%2F4b%2F51%2Fb64b515569b90bfd52b29166c0036e29.jpg&f=1&nofb=1&ipt=6f5cfe6e894372fe2f3b56e1644f0753f3244c54816079e7233ca8d8c3276feb&ipo=images",
        preview: false
      },
      {
        spotId: 10,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F9g5lTaUK1XY%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=dce9394372c28b8ebb57db691c9fa22b80092bd0ee1dc0cd95d6a7ccdd2a803a&ipo=images",
        preview: false
      },
      {
        spotId: 10,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fak.picdn.net%2Foffset%2Fphotos%2F591cb18017fb156e4805ff82%2Flarge_w%2Foffset_565196.jpg&f=1&nofb=1&ipt=4f6714b17ea7f7c77f6b82a99e8220ff842b4083328205f4bb1ba76527829afc&ipo=images",
        preview: false
      },
      {
        spotId: 11,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FAzDmJsPlEPkOGpZUoqec77BiOTg%3D%2F0x0%3A2043x980%2F1200x0%2Ffilters%3Afocal(0x0%3A2043x980)%3Ano_upscale()%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F19124184%2FTemple_banner_2018.jpg&f=1&nofb=1&ipt=cbad72759d1ca6b9c167654cd91f395ad9d753314129d6abc14aedfa7be11899&ipo=images",
        preview: true
      },
      {
        spotId: 11,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ffc%2Fe4%2F7d%2Ffce47d97222de911563aa66fa8fcfb82.jpg&f=1&nofb=1&ipt=e479e3e39a4d7ae2db1c927292433ede5423bba2ac80577ad2a0ab944ab924e7&ipo=images",
        preview: false
      },
      {
        spotId: 11,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-g23qbyfFRWM%2FTa0kJ8fsvwI%2FAAAAAAAABw4%2FlBHM5oxOqso%2Fs1600%2FSeattle%2BTreehouse%2BApril%2B2011%2B%2525283%2Bof%2B28%252529.jpg&f=1&nofb=1&ipt=48455ef904c5ca663a0587ed68f4c38d054e01a600a6953d50bb6c5e4ac37642&ipo=images",
        preview: false
      },
      {
        spotId: 11,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffm.cnbc.com%2Fapplications%2Fcnbc.com%2Fresources%2Fimg%2Feditorial%2F2017%2F10%2F13%2F104771518-msft-tree-house2.530x298.jpg%3Fv%3D1507909068&f=1&nofb=1&ipt=0b5794be7c31a835affd55d8c671b210fb315ad57d69d71b17b5e521a111c26a&ipo=images",
        preview: false
      },
      {
        spotId: 11,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd4%2F4f%2F07%2Fd44f07bdb5de0b77a3adac51e70c13f5.jpg&f=1&nofb=1&ipt=2a87d65f1664edc34c5ab5cb148b894999c62a8d3a47a745279ec52b79008f4f&ipo=images",
        preview: false
      },
      {
        spotId: 12,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fphotos.zillowstatic.com%2Fp_e%2FISyngko17hw7m30000000000.jpg&f=1&nofb=1&ipt=6d7bbfeaf333549e56746ac8227d68014967920b72e9fe08f88d75ecf59672a3&ipo=images",
        preview: true
      },
      {
        spotId: 12,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F61%2Fe5%2F02%2F61e502c951887e82b1c6e04c27b807b3.jpg&f=1&nofb=1&ipt=fe1217819fab626e20fd51c23609bbb0ffde782a525b6617325a94064368cfd2&ipo=images",
        preview: false
      },
      {
        spotId: 12,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe3%2Fa4%2Fcb%2Fe3a4cbbe8c798daf20f8881d2726596f.jpg&f=1&nofb=1&ipt=31f039abbd73a5ccf10be0f1a7edde636470fdfe89b2e620219c15e03dbe6892&ipo=images",
        preview: false
      },
      {
        spotId: 12,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fflavorverse.com%2Fwp-content%2Fuploads%2F2019%2F11%2FDevil%25E2%2580%2599s-Den-Best-Caves-in-Florida.jpg&f=1&nofb=1&ipt=9d8c777b871267f6693732e8c6fced30dbfebb0ee3ff48e5bc8b955ca8cf715e&ipo=images",
        preview: false
      },
      {
        spotId: 12,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F02%2F37%2F6a%2Fdc%2Fvenetian-pool.jpg&f=1&nofb=1&ipt=2667b0dafe15aa1d92449f2ccf05886f26fd66db6221af7c5ba8987240c029b0&ipo=images",
        preview: false
      },
      {
        spotId: 13,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Foffloadmedia.feverup.com%2Fsecretchicago.com%2Fwp-content%2Fuploads%2F2020%2F01%2F28080814%2Fgalos-caves.jpg&f=1&nofb=1&ipt=0c728793bcb6b2ad1b92870ea00d9ff68a850d989176404a7683a9c70bdf31b6&ipo=images",
        preview: true
      },
      {
        spotId: 13,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblogs.uchicago.edu%2Fchicagostudies%2Fgalos_caves_01.jpg&f=1&nofb=1&ipt=b639e75508e1889ddc06f67c1cb77128497634033b7a5107aa33f5ad6e0972a1&ipo=images",
        preview: false
      },
      {
        spotId: 13,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgreathikeschicago.com%2Fwp-content%2Fuploads%2F2021%2F02%2Fcave_web-768x576.jpg&f=1&nofb=1&ipt=3fd46abc60a32629c97da8171e2670a487d33982ecbc4029a072341f2e167599&ipo=images",
        preview: false
      },
      {
        spotId: 13,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F32%2Fb8%2F0b%2F32b80bd623c8af1e7828165d2bff5abb--caves-wellness.jpg&f=1&nofb=1&ipt=18a454f2d9254f4bd6c7c862100038cad8bca69c0cf4eb100ed0b0a68686ae18&ipo=images",
        preview: false
      },
      {
        spotId: 13,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Frjo4hweqnc021.jpg&f=1&nofb=1&ipt=5a3a034b4cee050199eb4d3cba3fb31134f0a52d21ae0e668547fb077663daa3&ipo=images",
        preview: false
      },
      {
        spotId: 14,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.onlyinyourstate.com%2Fwp-content%2Fuploads%2F2017%2F02%2F12938195_10156756715240503_3762786574969378901_n.jpg&f=1&nofb=1&ipt=e0b66d92cd4478816bb87a442dd259cd5b69a2c3d40e867ed0860effa0a5daf6&ipo=images",
        preview: true
      },
      {
        spotId: 14,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fculturemap-com%2Fimage%2Fupload%2Far_4%3A3%2Cc_fill%2Cg_faces%3Acenter%2Cw_980%2Fv1494886809%2Fphotos%2F224599_original.jpg&f=1&nofb=1&ipt=516e27a3bd264c71ba14ccb09d5565bc4875895c1e8d08c5df26256f9e5d4f8d&ipo=images",
        preview: false
      },
      {
        spotId: 14,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdo512family.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fpage-cover_photo-10544.jpg&f=1&nofb=1&ipt=f869d04f2f9d5dbccfd71ac1c53653c2aaba067f5cbb85603468487026357852&ipo=images",
        preview: false
      },
      {
        spotId: 14,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F60%2Fe8%2F76%2F60e876257aaffb079834eabdc4e25cf0.png&f=1&nofb=1&ipt=461fbbcab13977b0db0d94acc13c56486b3682ffcb8bf8fb1796d8cb6ca0a0cf&ipo=images",
        preview: false
      },
      {
        spotId: 14,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnaftel.co.uk%2Fwp-content%2Fuploads%2F2018%2F10%2FMusic-Cave-2.jpg&f=1&nofb=1&ipt=76e0d8a457aa729743991edeacf7775802762517b2436d7e01a234d70535efda&ipo=images",
        preview: false
      },
      {
        spotId: 15,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.sandiegodreampools.com%2Fwp-content%2Fuploads%2F2015%2F05%2F099.jpg&f=1&nofb=1&ipt=a551a64d2d08b7ecfda2dc98e55069d1dd24318a82b3eef2b674db0f20720e09&ipo=images",
        preview: true
      },
      {
        spotId: 15,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.IDbaUfFi2ELyOY4TZjNHnAHaE8%26pid%3DApi&f=1&ipt=d6e337fe2cc1dabf3ee5a06fc13129e73e05adc4f3638c1849fa1c10ed19437b&ipo=images",
        preview: false
      },
      {
        spotId: 15,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhiddensandiego.com%2Fwp-content%2Fuploads%2F2022%2F07%2Fsunny-jim-cave-1.jpg&f=1&nofb=1&ipt=06e2f2f0c60558573db196da6d2175569b6c718fa8a00b54ede0e1ac1f9e5bc4&ipo=images",
        preview: false
      },
      {
        spotId: 15,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F6a%2Fd9%2Fe3%2F6ad9e37635ded9736a183acc43397652.jpg&f=1&nofb=1&ipt=b4065da7818bc12300725c53177f16703861e5ab978cc42694db1d99b082f71e&ipo=images",
        preview: false
      },
      {
        spotId: 15,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fca-times.brightspotcdn.com%2Fdims4%2Fdefault%2Fee34702%2F2147483647%2Fstrip%2Ftrue%2Fcrop%2F5184x2722%2B0%2B367%2Fresize%2F1200x630!%2Fquality%2F90%2F%3Furl%3Dhttps%3A%252F%252Fcalifornia-times-brightspot.s3.amazonaws.com%252Fc9%252Fd9%252Fe80be0384970abe8dcc197eaed2e%252Fcoast-reopen-3.JPG&f=1&nofb=1&ipt=29f5b140eb14558d53120bcc8680af3b6b7b614bc5750beebd072313fb97dbde&ipo=images",
        preview: false
      },
      {
        spotId: 16,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.kentuckymonthly.com%2Fdownloads%2F2441%2Fdownload%2Fbridge-908295_1920.jpg%3Fcb%3D92230e37a716c0fb70e0f071f7deef18&f=1&nofb=1&ipt=ad2f1034327cdf25b36ebaf66bbf427f69de8574dcc18c3282db3caf11138ded&ipo=images",
        preview: true
      },
      {
        spotId: 16,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fadventuresinthevilla.files.wordpress.com%2F2019%2F05%2Fimg_2673.jpg%3Fw%3D768&f=1&nofb=1&ipt=6bd0e7abc8f40021c0bef9ed1a6dd689bb79ff77ce5f2e5d05a2c47cdbadf5ec&ipo=images",
        preview: false
      },
      {
        spotId: 16,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbernheim.org%2Fwp-content%2Fuploads%2F2015%2F11%2FCaveHollow1510.jpeg&f=1&nofb=1&ipt=2aa644cca2c32bed5efaad091baf0a9897ba6e8532678af86761d93f4712c2fe&ipo=images",
        preview: false
      },
      {
        spotId: 16,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh6.googleusercontent.com%2Fproxy%2FDGCiCgSnbH3NZ8NRgMlODrsX0hpw8TtZoalLmOmbPmQ56fpdG9zYl5NpHBeYKwJ_ec0%3Ds0-d&f=1&nofb=1&ipt=0e9ac91af80904bcb6898502b85f2e49d624f5eee5b42d1f7578d25505254659&ipo=images",
        preview: false
      },
      {
        spotId: 16,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.fineartamerica.com%2Fimages%2Fartworkimages%2Fmediumlarge%2F1%2Fkentucky-hollow-michael-scott.jpg&f=1&nofb=1&ipt=eac7303a7bb2d5415bd170e9b43ad950791deb302872a353e32859cb4340a869&ipo=images",
        preview: false
      },
      {
        spotId: 17,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlyinyourstate.com%2Fwp-content%2Fuploads%2F2016%2F09%2F2299993793_316bf46722_o.jpg&f=1&nofb=1&ipt=d1da84895c9a05763a3c9a54b503a829a2a4148e0a256310625396e5f06de016&ipo=images",
        preview: true
      },
      {
        spotId: 17,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F02%2F34%2Ffb%2Fef%2Fhaunted-cave-in-the-basement.jpg&f=1&nofb=1&ipt=74ed4dd4812d3b0363a5aee38055197c9bb34a4fe34cb82b223ae89506b8128c&ipo=images",
        preview: false
      },
      {
        spotId: 17,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlyinyourstate.com%2Fwp-content%2Fuploads%2F2017%2F08%2F12058414764_840f994ebd_o.jpg&f=1&nofb=1&ipt=2bcaadf156f5610ea1e450aeec6440bda06016a519268d5a7ebe345883a079f3&ipo=images",
        preview: false
      },
      {
        spotId: 17,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-ew1Oh7h2reE%2FWwDso5NA6ZI%2FAAAAAAAArTM%2FJItJ2gTkqwYlRzTxCar0b59XuG3q3YjVQCLcBGAs%2Fs1600%2FGhost%252BCave%252B-%252B18.jpg&f=1&nofb=1&ipt=221ac993d4726a794e8c6a040133b549556af69c6e25cf9ee0c27906b9783959&ipo=images",
        preview: false
      },
      {
        spotId: 17,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flandmarkadventures.net%2Fwp-content%2Fuploads%2F2017%2F11%2FIMG_6524.jpg&f=1&nofb=1&ipt=88e35c3ef0a9d2b8d3c0a5e8b34dc3074556b3788a7587e863f10c022efe824f&ipo=images",
        preview: false
      },
      {
        spotId: 18,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flive.staticflickr.com%2F1753%2F41586089555_43ec163f20_b.jpg&f=1&nofb=1&ipt=c6c078f38ab70df04c8db39fa90652aa96ec771f754f17680811e4daf544f0f8&ipo=images",
        preview: true
      },
      {
        spotId: 18,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbeentheredonethatwithkids.com%2Fwp-content%2Fuploads%2F2019%2F07%2FIndian-Echo-Caverns-Crystal-Lake.jpeg&f=1&nofb=1&ipt=8e10d52bd7a87f14892596143216f9de758d873c471e3ca6931cd41409c96959&ipo=images",
        preview: false
      },
      {
        spotId: 18,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.fineartamerica.com%2Fimages-medium-large%2Fa-view-from-the-mouth-of-a-cave-of-echo-paul-chesley.jpg&f=1&nofb=1&ipt=13ab9c2ff9238f7bb9dbef0a18b19f160ec2e5bc2e7ea6e9e6c052b0db1d4349&ipo=images",
        preview: false
      },
      {
        spotId: 18,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F1c%2F6b%2F3d%2F3c%2Fecho-caves.jpg&f=1&nofb=1&ipt=0c287c1428e575251dac8b57d9fce3774e16dd4adcfb458c02fdfe1d17ce62c8&ipo=images",
        preview: false
      },
      {
        spotId: 18,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F0f%2Fd3%2F39%2F0f%2Fcrocodile-chamber.jpg&f=1&nofb=1&ipt=6a64ab42b4f68d47b8c5663ef20450971dcf20411a1b23b7940593ea93270b78&ipo=images",
        preview: false
      },
      {
        spotId: 19,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FyPnVHvTmzec%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=75c921ccf7cf3d7daf668d53e4774559707fe3cdc6704df01f885f8dd7087526&ipo=images",
        preview: true
      },
      {
        spotId: 19,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cityofsomerset.com%2Fwp-content%2Fuploads%2F2021%2F04%2FSET-RH-3.jpg&f=1&nofb=1&ipt=9325fa361aff353bb62095df3e30797179e4d9ab980606f994094bb5fe20a8d3&ipo=images",
        preview: false
      },
      {
        spotId: 19,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa4%2F77%2Fa2%2Fa477a25368c625099dda33079669ac9f.jpg&f=1&nofb=1&ipt=92b7eba7de2e06a37da1ea08f66279b2e0f40d5570235a21e4b8c7147d476b28&ipo=images",
        preview: false
      },
      {
        spotId: 19,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmhperry.files.wordpress.com%2F2016%2F11%2Fpunchbowl-rocky-hollow.jpg%3Fw%3D450&f=1&nofb=1&ipt=72ecbe72be61e105265d2e783c724408a082d542629f533be3ee5d32120abe7d&ipo=images",
        preview: false
      },
      {
        spotId: 19,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wbiw.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F07%2Frocky-hollow-canyon-trail.jpg&f=1&nofb=1&ipt=744faf5691cc2a343e98e72921054d202ef55080192c45db24e8ce6661710d02&ipo=images",
        preview: false
      },
      {
        spotId: 20,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffiles.abovetopsecret.com%2Ffiles%2Fimg%2Fhr52d3fe2a.jpg&f=1&nofb=1&ipt=eedfe8548686b6fa5c7052548cce00017a6a24352f999e7266269a7b389960d2&ipo=images",
        preview: true
      },
      {
        spotId: 20,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F29%2F7c%2F51%2F297c51af21010e2a8ab39e389203c586.jpg&f=1&nofb=1&ipt=c2a11dfa0aaf8660dfb59646bc660fea0bb9897a122101ce2c02e3170a263d3a&ipo=images",
        preview: false
      },
      {
        spotId: 20,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-8ZSqG19XM04%2FV25mCSEGlrI%2FAAAAAAAAI1I%2Fb-BcH1VmRsgBAcvDZvCcLM7gv8xx6dCXwCLcB%2Fs1600%2FCave%252Bof%252BCrystals%252B-Giant%252BCrystal%252BCave%252B2.jpg&f=1&nofb=1&ipt=4afc88eafb06a8e991877508b2d74a20c6410fe070341c8ed8fea7509d8742bb&ipo=images",
        preview: false
      },
      {
        spotId: 20,
        url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffiles.abovetopsecret.com%2Ffiles%2Fimg%2Ffi52d4007a.jpg&f=1&nofb=1&ipt=5ea33bdbff5a5eb1e80c5bc9f71848f8f2261a34cfa3407a19d3179a0409ba56&ipo=images",
        preview: false
      },
      {
        spotId: 20,
        url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsurvivetheark.com%2Fuploads%2Fmonthly_2016_09%2Flarge.Crystal_Caves.jpg.2634eacf5f1ba52c569e5b45b64e3f1b.jpg&f=1&nofb=1&ipt=3f19b5fb41aef26eb4473a7a82703694a70c300f221b9a648da0e0eaf4ca2262&ipo=images",
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
