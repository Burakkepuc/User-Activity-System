'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Activities', [{
       activity_name: "Today\'s Activity",
       activity_description: 'Today I do some development for the company project',
       createdAt: new Date(),
       updatedAt: new Date()
      },
    {
      activity_name: 'Hiring activity',
      activity_description: 'Today I hired 3 people for the company',
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Activities', null, {
      truncate: true, restartIdentity: true, cascade: true
    });
  }
};
