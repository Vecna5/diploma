const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');

module.exports = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                try {
                    const decoded = jwt.decode(token);
                    if (decoded && decoded.id) {
                        await UserModel.expiredUpdate(decoded.id);
                    }
                } catch (dbError) {
                    console.error('DB update error:', dbError);
                }
            }
            console.log('Error decoding token:', error);
            return res.status(400).json({ message: 'No access' });
        }
    } else {
        return res.status(403).json({
            message: 'No access',
        });
    }
};