const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, NODE_ENV, PORT, SECRET } = process.env;

const config = {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
  SECRET,
  PORT: Number.parseInt(PORT || '80', 10),
};

module.exports = config;
