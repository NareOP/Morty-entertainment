const jwt = require('jsonwebtoken');
const { Unauthorized } = require('lib/errors');
const { User } = require('models');
const { SECRET } = require('configs');

module.exports = async (req, res, next) => {
  const authorization = req?.headers?.authorization;
  if (!authorization) {
    throw new Unauthorized('Authorization header required!');
  }

  const token = jwt.verify(authorization.split(' ').pop(), SECRET);
  const user = await User.findOne({ where: { id: token.id } });

  if (!user) {
    throw new Unauthorized('Invalid token');
  }

  // Append user object to the request
  req.user = { ...user };
  next();
};
