'use strict';
const { encrypt } = require('utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'User',
      [
        {
          id: '3c9d7415-16de-4066-b910-594c87b29b5e',
          active: false,
          fullname: 'Josh Smith',
          email: 'josh.smith@optimumparners.co',
          password: await encrypt.cryptPassword('asdh49!@Ef'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'e3ecaaa2-a59c-4a25-8563-ce3109a5948c',
          fullname: 'Jivan Hegel',
          active: false,
          email: 'jivan.hegel@optimumparners.co',
          password: await encrypt.cryptPassword('[]ro30isd65]'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
