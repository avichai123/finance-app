'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'מזון' },
      { name: 'תחבורה' },
      { name: 'בילויים' },
      { name: 'שכר דירה' },
      { name: 'חשבונות' },
      { name: 'ביגוד' },
      { name: 'בריאות' },
      { name: 'חסכונות' },
      { name: 'משכורת' },
      { name: 'מתנות' }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
