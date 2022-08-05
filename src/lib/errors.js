const STATUS = require('./codes');

class BaseError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

class InternalError extends BaseError {
  constructor(message = 'Opps, Internal Error', statusCode = STATUS.INTERNAL_SERVER, errors) {
    super(message, statusCode, errors);
  }
}

class NotFound extends BaseError {
  constructor(message = 'Request Not Found', statusCode = STATUS.NOT_FOUND, errors) {
    super(message, statusCode, errors);
  }
}

class BadRequest extends BaseError {
  constructor(message = 'Bad Request', statusCode = STATUS.BAD_REQUEST, errors) {
    super(message, statusCode, errors);
  }
}

class Unauthorized extends BaseError {
  constructor(message = 'UnAuthorized Request', statusCode = STATUS.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

module.exports = {
  InternalError,
  NotFound,
  BadRequest,
  Unauthorized,
};
