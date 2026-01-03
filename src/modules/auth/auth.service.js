const repo = require('./auth.repository');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');

exports.register = async (data) => {

  const existingUser = await repo.findByEmail(data.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  const token = crypto.randomBytes(16).toString('hex');

  const user = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    token: token
  };
  const createdUser = await repo.create(user);
  return createdUser;
};

exports.login = async (data) => {
  const user = await repo.findByEmail(data.email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: user.token
  };
};

exports.checkToken = async (token) => {
  const user = await repo.findByToken(token);
  
  if (!user) {
    throw new Error('Invalid or expired token');
  }

  return {
    token: user.token,
    email: user.email,
    name: user.name
  };
};