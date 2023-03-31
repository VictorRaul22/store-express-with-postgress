const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI_TYPE = 'postgres'; //  mysql | postgres
const URI = `${URI_TYPE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
};
