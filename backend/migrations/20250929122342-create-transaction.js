'use strict';

/** @type {import('sequelize-cli').Migration} */

const Transaction = require('../models/transaction');
const {getModelAttributes} = require('../utils/database');
module.exports = {
  async up (queryInterface, Sequelize) {
    const {tableName , attributes} = getModelAttributes(Transaction);
    return queryInterface.createTable(tableName , attributes);
  },

  async down (queryInterface, Sequelize) {
    const {tableName} = getModelAttributes(Transaction);
    return queryInterface.dropTable(tableName);
  }
};
