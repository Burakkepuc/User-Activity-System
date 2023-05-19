'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [{
      name: 'Burak',
      surname:'Kepuc',
      email:'burak@test.com',
      password:'Deneme123',
      title_id:1,
      isAdmin:true,
        createdAt: new Date(),
      updatedAt: new Date(),
      },
    {
      name: 'John',
      surname:'Doe',
      email:'john@test.com',
      password:'Deneme123',
      title_id:2,
      isAdmin:false,
      createdAt: new Date(),
      updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {
      truncate: true, restartIdentity: true, cascade: true
    });
  }
};
