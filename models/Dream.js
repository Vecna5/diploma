const { Pool } = require('pg');
const db = require('../db');

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
    }
};

module.exports = DreamModel;