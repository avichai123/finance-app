'use strict';

/** @type {import('sequelize-cli').Migration} */

const Installment = require('../models/installment');
const {getModelAttributes} = require('../utils/database');
module.exports = {
  async up (queryInterface, Sequelize) {
    const {tableName , attributes} = getModelAttributes(Installment);
    return queryInterface.createTable(tableName , attributes);
  },

  async down (queryInterface, Sequelize) {
    const {tableName} = getModelAttributes(Installment);
    return queryInterface.dropTable(tableName);
  }
};
