const DreamModel = require('../models/Dream.js');
const UserModel = require('../models/User.js');
const pool = require('../db.js');

exports.top = async ( _ , res) => {
    try {
        const topDreamers = await UserModel.GetTop();

        res.status(200).json(topDreamers)
 
    } catch (error) {
        console.error('Error rating:', error);
    res.status(500).json({ message: 'Server error' });
    }
};

exports.random = async ( _ ,res) => {
    try {
const randDream = await DreamModel.randomDream();
res.status(200).json(randDream);
    } catch (error) {
        console.error('Error rating:', error);
    res.status(500).json({ message: 'Server error' });
    }
};

 exports.online = async (req, res) => {
try {
    const online = await UserModel.online();

    res.status(200).json(online)
} catch (error) {
    console.error('Error rating:', error);
    res.status(500).json({ message: 'Server error' });
}
};



