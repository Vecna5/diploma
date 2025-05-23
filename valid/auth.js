const { body } = require('express-validator');

const registerValidation = [
  body('username', 'Username must be at least 3 characters long').isLength({ min: 3 , max:20 }).notEmpty(),
  body('login', 'Login must be at least 3 characters long').isLength({ min: 3 , max:15 }).notEmpty(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 , max:20 }).notEmpty(),
];

const dreamValidation = [
  body('title', 'Title must be at least 3 characters long').isLength({ min: 3 , max: 15 }).isString().notEmpty(),
  body('content', 'Description must be at least 10 characters long').isLength({ min: 10 , max: 2000}).notEmpty(),
  body('tags', 'Tags must be at least 1 character long').isArray({ min: 1 , max: 4 }).notEmpty(),
  body('mood', 'Mood must be at least 1 character long').isIn('Bad', 'Neutral', 'Positive').notEmpty(),
  body('isPublic', 'isPublic must be a boolean').isBoolean().notEmpty(),
  body('isActive', 'isActive must be a boolean').isBoolean().optional().notEmpty(),  
];

module.exports = { registerValidation, dreamValidation };