const {Sequelize} = require('sequelize');
const configSetting = require('../config/config');
const ENV = process.env.NODE_ENV || 'development';

const credentials = configSetting[ENV];

const sequelize = new Sequelize(credentials.database , credentials.username , credentials.password ,{
    host:credentials.host,
    dialect:credentials.dialect,
    port:credentials.port
});

const getModelAttributes = (model) => {
    const tableName = model.tableName;
    const attributes = {};
    for(const [key , value] of Object.entries(model.rawAttributes)){
        attributes[key] = value;
    }
    return {tableName , attributes};
}

module.exports = {
    sequelize,
    getModelAttributes
};