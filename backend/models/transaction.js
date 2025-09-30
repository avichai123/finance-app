const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/database');

const Transaction = sequelize.define('Transaction' , {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'user_id'
    },
    type:{
        type:DataTypes.ENUM('income' , 'expense'),
        allowNull:false
    },
    categoryId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'category_id'
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    notes:{
        type:DataTypes.STRING,
        allowNull:true
    },
}, {
    tableName:'transactions',
    timestamps:false
});


module.exports = Transaction;