const { body } = require('express-validator');

const registerValidation = [
  body('username', 'Username must be at least 3 characters long').isLength({ min: 3 }).notEmpty(),
  body('login', 'Login must be at least 3 characters long').isLength({ min: 3 }).notEmpty(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).notEmpty(),
];

module.exports = { registerValidation };
