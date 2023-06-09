const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const setUpModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI_TYPE = 'postgres'; //  mysql | postgres
const URI = `${URI_TYPE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres', //aqui 10:55
  logging: console.log,
});
setUpModels(sequelize);
// sequelize.sync({ logging: console.log });
module.exports = sequelize;
