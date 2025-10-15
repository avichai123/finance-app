const { sequelize } = require('../utils/database');

const User = require('./user');
const Transaction = require('./transaction');
const Category = require('./category');
const Installment = require('./installment');

const db = {
  sequelize,
  User,
  Transaction,
  Category,
  Installment,
};


const applyAssociations = require('./associations');
applyAssociations(db);


module.exports = db;
