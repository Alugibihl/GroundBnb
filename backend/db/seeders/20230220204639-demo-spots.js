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
        ownerId: 4,
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
      {
        ownerId: 5,
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Hollywood Hills Retreat',
        description: "Experience the glitz and glamour of Hollywood in this stunning retreat nestled in the Hollywood Hills. With breathtaking views of the city skyline and luxurious amenities, this spot offers the perfect blend of relaxation and excitement. Indulge in the vibrant nightlife, explore famous landmarks, or simply unwind by the pool. Your dream vacation awaits!",
        price: 200.00
      },
      {
        ownerId: 4,
        address: '456 Oak Ave',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Central Park Oasis',
        description: "Escape the hustle and bustle of the city in this serene oasis overlooking Central Park. Located in the heart of Manhattan, this spot offers unparalleled access to world-class shopping, dining, and entertainment. Relax in the beautifully landscaped garden, take a leisurely stroll in the park, or explore the nearby cultural attractions. Experience the magic of New York City right at your doorstep!",
        price: 150.00
      },
      {
        ownerId: 5,
        address: '789 Elm St',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Golden Gate Getaway',
        description: "Discover the charm of San Francisco in this cozy retreat near the iconic Golden Gate Bridge. With its vibrant neighborhoods, stunning architecture, and diverse culinary scene, San Francisco offers a unique experience for every traveler. Whether you're exploring the bustling streets of Chinatown, biking across the Golden Gate Bridge, or sipping artisanal coffee in a hipster cafe, you'll fall in love with the city's endless charm.",
        price: 180.00
      },
      {
        ownerId: 1,
        address: '555 Pine St',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Seattle Skyline Retreat',
        description: "Immerse yourself in the beauty of Seattle's skyline from this modern retreat located in the heart of the city. With its iconic Space Needle, thriving music scene, and picturesque waterfront, Seattle offers a vibrant urban experience. Explore Pike Place Market, hike through lush green forests, or indulge in the city's renowned coffee culture. Discover the eclectic charm of the Emerald City!",
        price: 160.00
      },
      {
        ownerId: 2,
        address: '222 Maple Ave',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Miami Beachfront Paradise',
        description: "Experience the ultimate beachfront getaway in this luxurious spot located on the pristine shores of Miami. With its year-round sunshine, crystal-clear waters, and vibrant nightlife, Miami offers the perfect blend of relaxation and excitement. Lounge by the pool, soak up the sun on the white sandy beaches, or explore the trendy art deco district. Indulge in the glamorous lifestyle of Miami!",
        price: 250.00
      },
      {
        ownerId: 3,
        address: '987 Broadway Ave',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Downtown Chic Loft',
        description: "Immerse yourself in the vibrant energy of downtown Chicago from this stylish loft in the heart of the city. With its iconic architecture, world-class museums, and renowned culinary scene, Chicago offers a rich cultural experience. Stroll along the Magnificent Mile, catch a show at the theater district, or admire the breathtaking views from the Skydeck. Discover the allure of the Windy City!",
        price: 190.00
      },
      {
        ownerId: 4,
        address: '369 Oakwood Ln',
        city: 'Austin',
        state: 'Texas',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Austin Music Retreat',
        description: "Immerse yourself in the vibrant music scene of Austin, the Live Music Capital of the World, from this charming retreat located in the heart of the city. With its eclectic mix of music genres, thriving food scene, and outdoor activities, Austin offers a unique cultural experience. Catch a live performance on Sixth Street, explore the vibrant food truck scene, or paddleboard on Lady Bird Lake. Experience the soul of Austin!",
        price: 170.00
      },
      {
        ownerId: 5,
        address: '777 Market St',
        city: 'San Diego',
        state: 'California',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'San Diego Coastal Getaway',
        description: "Escape to the picturesque coastal city of San Diego and enjoy a relaxing getaway in this beautiful spot. With its stunning beaches, year-round sunshine, and laid-back vibe, San Diego offers the perfect destination for beach lovers and outdoor enthusiasts. Surf the waves at Pacific Beach, visit the world-famous San Diego Zoo, or take a leisurely stroll along the scenic waterfront. Discover the beauty of San Diego!",
        price: 220.00
      },
      {
        ownerId: 4,
        address: '111 Cave Entrance Rd',
        city: 'Mystic Hollow',
        state: 'Kentucky',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Enchanted Cave Retreat',
        description: "Embark on an extraordinary adventure in this enchanting cave retreat. Nestled deep within Mystic Hollow, this spot offers a unique experience like no other. Explore the magical underground chambers, marvel at the glittering stalactites, and immerse yourself in the mystic ambiance. Unleash your inner explorer and create memories that will last a lifetime!",
        price: 80.00
      },
      {
        ownerId: 5,
        address: '222 Subterranean Lane',
        city: 'Shadowville',
        state: 'California',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Cavern Haven',
        description: "Discover the hidden wonders of Shadowville at Cavern Haven. This cozy cave spot offers a secluded and tranquil retreat from the outside world. With its natural rock formations, soft candlelit ambiance, and a soothing underground river, this is the perfect spot to reconnect with nature and find inner peace.",
        price: 120.00
      },
      {
        ownerId: 1,
        address: '333 Grotto Way',
        city: 'Echo Falls',
        state: 'Washington',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Echoing Grotto Getaway',
        description: "Immerse yourself in the ethereal beauty of Echo Falls at this stunning grotto getaway. Surrounded by shimmering crystals and cascading waterfalls, this spot offers a truly magical experience. Unwind in the underground hot springs, take a guided tour of the hidden caves, or simply marvel at the breathtaking natural formations. Let the enchantment of Echo Falls captivate your senses.",
        price: 150.00
      },
      {
        ownerId: 2,
        address: '444 Stalactite St',
        city: 'Rocky Hollow',
        state: 'Kentucky',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Rocky Retreat',
        description: "Escape to the serenity of Rocky Hollow and find solace in this unique cave retreat. With its towering stalactites, underground streams, and peaceful atmosphere, this spot offers a true sense of tranquility. Whether you're seeking a romantic getaway or a peaceful meditation retreat, Rocky Retreat is the perfect sanctuary for relaxation and rejuvenation.",
        price: 100.00
      },
      {
        ownerId: 3,
        address: '555 Crystal Caverns Rd',
        city: 'Crystalville',
        state: 'California',
        country: 'United States',
        lat: null,
        lng: null,
        name: 'Crystal Cave Hideout',
        description: "Uncover the secrets of Crystalville at this hidden gem, the Crystal Cave Hideout. Adorned with shimmering crystals and glowing minerals, this spot offers a mesmerizing ambiance that will transport you to a world of magic and wonder. Explore the underground passages, soak in the natural mineral springs, and experience the enchantment of Crystalville.",
        price: 90.00
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options);

  }
};
