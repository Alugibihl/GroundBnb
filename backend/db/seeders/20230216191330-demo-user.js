const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Bill',
        lastName: 'Nye',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Will',
        lastName: 'Guy',
        email: 'user1@user.io',
        username: 'WillWillWillWhatsThisThen',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Phill',
        lastName: 'Gut',
        email: 'user2@user.io',
        username: 'Phill024132',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'William',
        lastName: 'Hendrix',
        email: 'will2behenderix@user.io',
        username: 'wildrix',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Alexa',
        lastName: 'Geniveve',
        email: 'heyAlexa@user.io',
        username: 'NotThatAlexa',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
