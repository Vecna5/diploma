
require('dotenv').config();
const { Pool } = require('pg');

const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const pool = require('./db.js');
const UserModel = require('./models/User.js');
const { validationResult } = require('express-validator');
const { registerValidation } = require('./valid/auth');
const checkAuth = require('./middleware/checkAuth.js');

const AuthController = require('./controllers/AuthController.js');
const DreamsController = require('./controllers/DreamController.js');

const app = express();
app.use(express.json());

app.get('/auth/me', checkAuth, DreamsController.me);

app.post('/auth/login', AuthController.login );

app.post('/auth/register', AuthController.register);

//app.get('/dreams', checkAuth, DreamsController.getAllDreams);
//app.get('/dreams/:id', checkAuth, DreamsController.getDreamById);
app.post('/dreams', checkAuth, DreamsController.createDream);
// app.delete('/dreams/:id', checkAuth, DreamsController.deleteDream);
// app.put('/dreams/:id', checkAuth, DreamsController.updateDream);



app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    }

  console.log('Server is running on http://localhost:5000');
});