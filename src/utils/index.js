const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('configs');

const encrypt = {
  cryptPassword: async password => {
    if (!password) return;

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => hash);
  },

  comparePassword: async (password, hashPassword) => {
    if (!password || !hashPassword) return 'sorry';
    return bcrypt.compare(password, hashPassword).then(resp => resp);
  },
};

const generateAccessToken = user => {
  return jwt.sign(user, SECRET, { expiresIn: '24h' });
};

const respond = ({ code = 200, message = 'Ok', ...args } = {}) => ({
  code,
  message,
  ...args,
});

module.exports = { encrypt, generateAccessToken, respond };
