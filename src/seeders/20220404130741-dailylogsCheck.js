'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Dailylogs',
      [
        {
          id: 'a9e4baa5-d65b-4acc-8095-31a58fb3a3b7',
          timestamp: 'Wed Mar 29 2022 08:55:43 +0400',
          duration: 5,
          user_id: '3c9d7415-16de-4066-b910-594c87b29b5e',
          confirmed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '934088de-c6a8-4439-b0d9-6ff42da6dac0',
          timestamp: 'Wed Mar 29 2022 08:55:43 +0400',
          duration: 8,
          user_id: '3c9d7415-16de-4066-b910-594c87b29b5e',
          confirmed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dailylogs', null, {});
  },
};
