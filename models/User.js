const { Pool } = require('pg');
const db = require('../db');

const UserModel = {
  async getAllUsers() {
    const result = await db.query('SELECT * FROM users');
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
  }
};

module.exports = UserModel;

