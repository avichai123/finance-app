const {DataTypes} = require('sequelize');
const {sequelize} = require('../utils/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User' , {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    phoneNumber:{
        type:DataTypes.STRING,
        field:'phone_number',
        allowNull:false,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    timestamps:false,
    tableName:'users',
    hooks:{
        beforeCreate:async(user) => {
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password , salt);
            }
        },
        beforeUpdate:async (user) => {
            if(user.changed('password')){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password , salt)
            }
        }
    }
});

module.exports = User;