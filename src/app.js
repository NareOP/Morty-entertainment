const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const routes = require('./routers');

const errorHandler = require('middleware/error-handler');
const { NotFound, InternalError } = require('lib/errors');

const db = require('models');

const app = express();

// security layer https://www.npmjs.com/package/helmet
app.use(helmet());
// Saves devs' time
app.use(logger('dev'));
// Parse nested objects with https://www.npmjs.com/package/qs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Allow access cors-origin
app.use(cors({ origin: '*' }));

app.use('/', routes);

app.use('*', (req, res, next) => {
  throw new NotFound();
});

app.use(errorHandler);

try {
  db.sequelize.authenticate();
} catch (error) {
  throw new InternalError('Unable to connect to the database', error);
}

module.exports = { app };
