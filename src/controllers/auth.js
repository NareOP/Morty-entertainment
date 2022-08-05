const { User } = require('../models');
const STATUS = require('lib/codes');
const { BadRequest, Unauthorized } = require('lib/errors');
const { encrypt, generateAccessToken, respond } = require('utils');

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ where: { email: email.toLowerCase() } });

  if (!foundUser) {
    throw new Unauthorized('Invalid email or password');
  }

  if (!await encrypt.comparePassword(password, foundUser.password)) {
    throw new Unauthorized('Invalid email or password');
  }

  return res.json(respond({ access_token: generateAccessToken({ foundUser }) }));
};

const register = async (req, res) => {
  const { email, password, fullname } = req.body;

  const newUser = await User.create({
    email,
    password: await encrypt.cryptPassword(password),
    fullname,
  }).catch(err => {
    if (err?.errors[0]?.message === 'email must be unique') {
      throw new BadRequest('Email already exists', STATUS.CONFLICT);
    }

    throw new BadRequest(err.message);
  });

  return res.json(respond({ access_token: generateAccessToken({ newUser }) }));
};

// TODO: https://trello.com/c/lZ1HbxaN
// const verify = async (request, response) => {
// };

module.exports = {
  login,
  register,
};
