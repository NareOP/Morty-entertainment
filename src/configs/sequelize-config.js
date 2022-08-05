const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = require('./index');

const defaultConfig = {
  database: DB_NAME,
  dialect: 'postgres',
  host: DB_HOST,
  password: DB_PASSWORD,
  port: DB_PORT,
  username: DB_USERNAME,
  seederStorage: 'sequelize',
};

module.exports = {
  development: defaultConfig,
  test: defaultConfig,
  production: defaultConfig,
};
