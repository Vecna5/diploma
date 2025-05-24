const UserModel = require('../models/User.js');
const DreamModel = require('../models/Dream.js');
const checkAuth = require('../middleware/checkAuth.js');
const { dreamValidation } = require('../valid/auth.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.me = async (req, res) => {
    
  try{
    const user = await UserModel.getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
    message: 'User authenticated successfully',
    username: user.username, //Здесь мы выводим никнейм полученный через модель
  });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createDream = async (req, res) => {
try {

  const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
const { title, content, tags, mood, isPublic,  } = req.body;
const userId = req.userId;

const dream = await DreamModel.createDream(
  userId,
  title,
  content,
  tags,
  mood,
  isPublic
);
 res.status(201).json({
    message: 'Dream created successfully',
    dream: {
      id: dream.id,
      title: dream.title,
      content: dream.content,
      tags: dream.tags,
      mood: dream.mood,
      isPublic: dream.is_public,
      isActive: dream.is_active,
      likes: dream.likes,
      dislikes: dream.dislikes,
    },
  });
} catch (error) {
    console.error('Error creating dream:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllDreams = async (req, res) => {
  try{
const userId = req.userId;
const dreams = await DreamModel.getAllDreams()
res.status(200).json({
 dream: dreams
})

  } catch (error) {
    console.log('Error getting dreams:', error);
    res.status(500).json({message: 'Server error'});
  }
};

exports.getDreamById = async (req, res) => {
  try{
const userId = req.userId;
const { id } = req.params;
const dream = await DreamModel.getDreamById(id, userId)

if (!dream) {
  return res.status(404).json ({
success: false,
error: 'Dream not found'
  });
}
res.status(200).json({
      success: true,
      data: {
        id: dream.id,
        title: dream.title,
        content: dream.content,
        tags: dream.tags,
        mood: dream.mood,
        isPublic: dream.is_public,
        createdAt: dream.created_at
      }
    });
  } catch (error) {
 console.log('Error getting dreams:', error);
    res.status(500).json({message: 'Server error'});
  }
};

exports.deleteDream = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const dream = await DreamModel.deleteDream(id, userId)

    if (!dream) {
      return res.status(404).json ({
        success: false,
        error: 'Dream not found'
      });  
    }

    res.status(200).json({
      success: true,
    });
  
  } catch (error) {
     console.log('Error delete dreams:', error);
    res.status(500).json({message: 'Server error'});
  }
}

exports.updateDream = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, content, tags, mood, isPublic } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const dream = await DreamModel.updateDream(
      id,
      userId,
      title,
      content,
      tags,
      mood,
      isPublic
    );

    if (!dream) {
      return res.status(404).json({
        success: false,
        error: 'Dream not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: dream.id,
        title: dream.title,
        content: dream.content,
        tags: dream.tags,
        mood: dream.mood,
        isPublic: dream.is_public
      }
    });

  } catch (error) {
    console.log('Error updating dreams:', error);
    res.status(500).json({ message: 'Server error' });
  }
};