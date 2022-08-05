module.exports = (error, req, res, next) => {
  const { message, statusCode = 500, errors } = error;
  const response = {
    status: statusCode,
    message,
  };
  if (errors) {
    response.errors = errors;
  }
  res.status(statusCode).json(response);
};
