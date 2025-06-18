const { Pool } = require('pg');
const db = require('../db');
const { updateDream } = require('./Dream');

const UserModel = {
  async getAllUsers() {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  },

  async getUserById(id) {
    const result = await db.query(
      'SELECT id, username , created_at , last_activity FROM users WHERE id = $1', //Выбираем айдишник и юзернейм и потом юзаем это на получении даных
      [id]
    );
    return result.rows[0];
  },

 async GetTop() {
    const result = await db.query(
      `SELECT u.id, u.username, COALESCE(SUM(d.likes), 0) AS total_likes
       FROM users u
       LEFT JOIN dreams d ON u.id = d.user_id
       GROUP BY u.id, u.username
       ORDER BY total_likes DESC
       LIMIT 4`
    );
    return result.rows;
  },
  async findByLogin(login) {
    const result = await db.query(
      'SELECT * FROM users WHERE login = $1',
      [login]
    );
    return result.rows[0];
  },

  
  async createUser(username, login, passwordHash) {
    const result = await db.query(
      'INSERT INTO users (username ,login, password) VALUES ($1, $2 , $3) RETURNING *',
      [ username, login, passwordHash]
    );
    return result.rows[0];
  },

  async updateStatus( userId ) {
    try {
    const  result = await db.query(
      'UPDATE users SET is_online = true , last_activity = NOW() WHERE id = $1', [ userId ]
    );
    return result;
  } catch (error) {
       console.error('Error in UserModel.updateStatus:', error);
            throw error;
  }
  },


  async online () {
    try {
    const result = await db.query(`SELECT COUNT (id) FROM users WHERE is_online = true`);
    return result.rows[0];
    } catch (error) {
       console.error('Error in UserModel.updateStatus:', error);
            throw error;
    }
  },
};



module.exports = UserModel;

