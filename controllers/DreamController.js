const UserModel = require('../models/User.js');
const DreamModel = require('../models/Dream.js');
const checkAuth = require('../middleware/checkAuth.js');
const ImageModel = require('../models/Image.js');
const { dreamValidation } = require('../valid/auth.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.getOneDreamById = async (req, res) => {
  try {
    const dreamId = req.params.id;
    const userId = req.userId;

    const dream = await DreamModel.getOneDreamById(dreamId, userId);

    if (!dream) {
      return res.status(404).json({
        success: false,
        error: 'Dream not found'
      });
    }

    
    const images = await ImageModel.getImagesByDreamId(dreamId);

    res.status(200).json({
      success: true,
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
        images 
      },
    }); 
   } catch (error) {
    console.error('Error getting dream by ID:', error);
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
const dream = await DreamModel.getDreamById(userId)

if (!dream) {
  return res.status(404).json ({
success: false,
error: 'Dream not found'
  });
}
res.status(200).json({
      success: true,
      dream
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

// ...existing code...
exports.updateDream = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    let { title, content, tags, mood, isPublic } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Получаем текущий сон
    const currentDream = await DreamModel.getOneDreamById(id, userId);
    if (!currentDream) {
      return res.status(404).json({
        success: false,
        error: 'Dream not found'
      });
    }

    // Подставляем старые значения, если новые не пришли
    title = typeof title !== 'undefined' ? title : currentDream.title;
    content = typeof content !== 'undefined' ? content : currentDream.content;
    tags = typeof tags !== 'undefined' ? tags : currentDream.tags;
    mood = typeof mood !== 'undefined' ? mood : currentDream.mood;
    isPublic = typeof isPublic !== 'undefined' ? isPublic : currentDream.is_public;

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
