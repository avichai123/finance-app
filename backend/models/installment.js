const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Installment = sequelize.define('Installment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'transaction_id'
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'installments',
    timestamps: false
});

module.exports = Installment;