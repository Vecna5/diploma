
const { registerValidation } = require('../valid/auth.js');
const UserModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
console.log(req.body);
 
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

try {
  const { username, login, password } = req.body;

   const existingUser = await UserModel.findByLogin(login);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(11);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await UserModel.createUser(username, login, passwordHash);
    const token = jwt.sign(
      { id: newUser.id,
       },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'User registered successfully',
      userId: newUser.id,
      token: token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
try {
  const { login, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await UserModel.findByLogin(login);
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) { 
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign(
    { id: user.id, login: user.login },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.status(200).json({
    message: 'User logged in successfully',
    userId: user.id,
    token: token,
  });

} catch (error) {
  console.error('Error logging in user:', error);
  res.status(500).json({ message: 'Server error' });
}
};