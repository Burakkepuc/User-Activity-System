'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  

   await queryInterface.bulkInsert('Titles', [{
      title_name: 'Manager',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      title_name: 'Developer',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      title_name: 'Salesperson',
      createdAt: new Date(),
      updatedAt: new Date()
      },
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Titles', null, {
      truncate: true, restartIdentity: true, cascade: true
    });
  }
};
