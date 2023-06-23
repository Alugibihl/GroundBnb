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
      {
        spotId: 8,
        userId: 4,
        review: "This is absolutely gorgeous!!!! A must see.",
        stars: 5
      },
      {
        spotId: 8,
        userId: 2,
        review: "This felt like a dream, I cannot believe how utterly beautiful this place is. With the farm outside we could get a chance to try our hand at gardening. It's hard to believe this is so close to Hollywood. I cannot praise this enough",
        stars: 5
      },
      {
        spotId: 9,
        userId: 5,
        review: "This is terrifying to think this is here in New York. Just out of sight.",
        stars: 3
      },
      {
        spotId: 10,
        userId: 3,
        review: "These are gorgeous views!!! I was expecting there to be furniture, so a star gone for that.",
        stars: 4
      },
      {
        spotId: 11,
        userId: 3,
        review: "These are gorgeous views!!! I was expecting there to be furniture, so a star gone for that.",
        stars: 4
      },
      {
        spotId: 11,
        userId: 4,
        review: "Absolutely stunning! The cave formations are incredible. A truly unique experience.",
        stars: 5
      },
      {
        spotId: 12,
        userId: 1,
        review: "The beachfront location is unbeatable. We had a fantastic time soaking up the sun!",
        stars: 5
      },
      {
        spotId: 12,
        userId: 2,
        review: "The property is beautiful, but the noise from the nearby clubs kept us up at night.",
        stars: 3
      },
      {
        spotId: 13,
        userId: 3,
        review: "The loft was stylish and conveniently located. We loved exploring downtown Chicago!",
        stars: 4
      },
      {
        spotId: 13,
        userId: 4,
        review: "The loft had a few maintenance issues, but the host was responsive and resolved them quickly.",
        stars: 3
      },
      {
        spotId: 14,
        userId: 5,
        review: "The music scene in Austin is amazing, and this spot was the perfect base for our adventures.",
        stars: 5
      },
      {
        spotId: 14,
        userId: 1,
        review: "The cleanliness of the spot could have been better. Otherwise, a great experience.",
        stars: 4
      },
      {
        spotId: 15,
        userId: 2,
        review: "We had a wonderful time in San Diego. The spot was comfortable and close to the beach.",
        stars: 5
      },
      {
        spotId: 15,
        userId: 3,
        review: "The spot was smaller than expected, but the location made up for it. Great for a beach getaway.",
        stars: 4
      },
      {
        spotId: 16,
        userId: 4,
        review: "The cave retreat was enchanting. It felt like stepping into a magical world!",
        stars: 5
      },
      {
        spotId: 16,
        userId: 5,
        review: "The cave had a damp smell, but the unique experience made up for it. Bring a flashlight!",
        stars: 3
      },
      {
        spotId: 17,
        userId: 1,
        review: "The Cavern Haven spot was peaceful and rejuvenating. We loved the underground river!",
        stars: 5
      },
      {
        spotId: 17,
        userId: 2,
        review: "The spot was smaller than expected, but the natural rock formations were impressive.",
        stars: 4
      },
      {
        spotId: 18,
        userId: 3,
        review: "Echoing Grotto Getaway was like a fairytale. The waterfalls and hot springs were breathtaking.",
        stars: 5
      },
      {
        spotId: 18,
        userId: 4,
        review: "The tour of the hidden caves was disappointing. Expected more from the experience.",
        stars: 2
      },
      {
        spotId: 19,
        userId: 5,
        review: "Rocky Retreat provided a peaceful escape. Perfect for meditation and self-reflection.",
        stars: 4
      },
      {
        spotId: 19,
        userId: 1,
        review: "The spot lacked some basic amenities, but the tranquility of the cave made up for it.",
        stars: 3
      },
      {
        spotId: 20,
        userId: 2,
        review: "The Crystal Cave Hideout was magical. The natural mineral springs were rejuvenating.",
        stars: 5
      },
      {
        spotId: 20,
        userId: 3,
        review: "The spot was smaller than expected, but the shimmering crystals were mesmerizing.",
        stars: 4
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options);
  }
};
