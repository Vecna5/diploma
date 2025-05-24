const { Pool } = require('pg');
const db = require('../db');
const { getDreamById } = require('../controllers/DreamController');

const DreamModel = {
    async createDream(userId, title, content, tags, mood, isPublic) {
        try {
            const result = await db.query(
                `INSERT INTO dreams (
                    user_id, 
                    title, 
                    content, 
                    tags, 
                    mood, 
                    is_public, 
                    is_active, 
                    likes, 
                    dislikes
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                [
                    userId,
                    title,
                    content,
                    JSON.stringify(tags),
                    mood,
                    isPublic,
                    true,    
                    0,      
                    0       
                ]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error in DreamModel.createDream:', error);
            throw error;
        }
    },

    async getAllDreams() {
        try {
            const result = await db.query('SELECT * FROM dreams ORDER BY created_at DESC');
            return result.rows;
        } catch (error) {
            console.error('Error in DreamModel.getAllDreams:', error);
            throw error;
        }
    },

    async getDreamById(dreamId , userId) {
        try {
            const result = await db.query('SELECT * FROM dreams WHERE id = $1 AND user_id = $2',
                [dreamId, userId]
            );
            return result.rows[0]; //Возвращаем первый елемент масива
        } catch (error) {
          console.error('Error in DreamModel.getDreamById:', error);
            throw error;
        }
    },

    async deleteDream(dreamId, userId) {
        try {
            const result = await db.query('DELETE FROM dreams WHERE id = $1 AND user_id = $2 RETURNING *',
             [dreamId, userId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error in DreamModel.deleteDream:', error);
            throw error;
        }
    },

    async updateDream(dreamId, userId, title, content, tags, mood, isPublic) {
        try {
            const result = await db.query(
                `UPDATE dreams 
                 SET title = $1, content = $2, tags = $3, mood = $4, is_public = $5 
                 WHERE id = $6 AND user_id = $7 
                 RETURNING *`,
                [
                    title,
                    content,
                    JSON.stringify(tags),
                    mood,
                    isPublic,
                    dreamId,
                    userId
                ]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error in DreamModel.updateDream:', error);
            throw error;
        }
    },
};

module.exports = DreamModel;