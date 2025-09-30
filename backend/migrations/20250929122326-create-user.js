'use strict';

/** @type {import('sequelize-cli').Migration} */

const User = require('../models/user');
const {getModelAttributes} = require('../utils/database');
module.exports = {
  async up (queryInterface, Sequelize) {
    const {tableName , attributes} = getModelAttributes(User);
    return queryInterface.createTable(tableName , attributes);
  },

  async down (queryInterface, Sequelize) {
    const {tableName} = getModelAttributes(User);
    return queryInterface.dropTable(tableName);
  }
};
