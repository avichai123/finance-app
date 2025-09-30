'use strict';

/** @type {import('sequelize-cli').Migration} */

const Category = require('../models/category');
const {getModelAttributes} = require('../utils/database');
module.exports = {
  async up (queryInterface, Sequelize) {
    const {tableName , attributes} = getModelAttributes(Category);
    return queryInterface.createTable(tableName , attributes);
  },

  async down (queryInterface, Sequelize) {
    const {tableName} = getModelAttributes(Category);
    return queryInterface.dropTable(tableName);
  }
};
