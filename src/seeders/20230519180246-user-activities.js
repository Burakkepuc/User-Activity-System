'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
  
     await queryInterface.bulkInsert('UserActivities', [{
      user_id: 1,
      activity_id: 2,
      date: new Date("2022-05-19 21:22:40.481 +0300"),
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
       user_id: 2,
       activity_id: 1,
       date: new Date("2022-05-19 21:22:40.481 +0300"),
       createdAt: new Date(),
       updatedAt: new Date()
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserActivities', null, {
      truncate: true, restartIdentity: true, cascade: true
    });
  }
};
