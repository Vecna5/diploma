const UserModel = require('../models/User.js');

module.exports = async (req, res, next) => {
  try {
    if (req.userId) {
      await UserModel.updateStatus(req.userId);
    }
    next();
  } catch (error) {
    console.error('Error in updateOnline middleware:', error);
    return res.status(500).json({ error: 'Failed to update online status' });
  }
};