
require('dotenv').config();
const { registerValidation } = require('../valid/auth.js');
const UserModel = require('../models/User.js');
const DreamModel = require('../models/Dream.js');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');


exports.me = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [dreamsCount, lastDream, totalLikes] = await Promise.all([
      DreamModel.countDreamsByUser(user.id),
      DreamModel.getLastDreamByUser(user.id),
      DreamModel.getTotalLikesByUser(user.id)
    ]);

    res.json({
      id: user.id,
      username: user.username,
      created_at: user.created_at,
      last_activity: user.last_activity,
      dreams_count: dreamsCount,
      last_dream: lastDream,
      total_likes: totalLikes
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
console.log(req.body);
 
try {
  const { username, login, password } = req.body;
 const saltRounds = parseInt(process.env.SEA_SALT) 
   const existingUser = await UserModel.findByLogin(login);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(saltRounds);
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
     await UserModel.updateStatus(newUser.id);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
try {
  const { login, password } = req.body;


  const user = await UserModel.findByLogin(login);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) { 
    return res.status(400).json({ message: 'Invalid password' });
  }
 await UserModel.updateStatus(user.id);

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