
require('dotenv').config();
const { Pool } = require('pg');

const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const rateLimit = require('express-rate-limit');

const pool = require('./db.js');
const UserModel = require('./models/User.js');
const ImageModel = require('./models/Image.js');
const { validationResult } = require('express-validator');
const { dreamValidation, registerValidation, loginValidation, updateValidation } = require('./valid/auth.js')
const handleValidationErrors = require('./middleware/handleValidationErrors.js') 
const checkAuth = require('./middleware/checkAuth.js') 
const updateOnline = require('./middleware/updateOnline.js')


const AuthController = require('./controllers/AuthController.js');
const DreamsController = require('./controllers/DreamController.js');
const RatingController = require('./controllers/RatingController.js')
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    cb(null, 'uploads');                // Указываем какую директорию используем как хранилище
  },
  filename: (__, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Обьясняем как сохранять и как будет называться файл
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { message: 'Too much bro)' }
});

const upload = multer({ storage }); // Даём експрессу знать, что мы используем multer и storage

app.use(express.json());
app.use(cors());
app.use(limiter); 

app.use('/uploads', express.static('uploads')); // Даём ексрпессу знать где храняться статические файлы чтоб можно было делать запросы к ним
app.get('/top', RatingController.top);
app.get('/random', RatingController.random);
app.get('/online', RatingController.online)

app.get('/auth/me', checkAuth, handleValidationErrors, AuthController.me);
app.post('/auth/login',  loginValidation, handleValidationErrors, AuthController.login);
app.post('/auth/register',  registerValidation , handleValidationErrors, AuthController.register);


app.post('/upload', checkAuth, upload.array('image', 4), async (req, res) => {
  const { dreamId } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  if (!dreamId) {
    return res.status(400).json({ message: 'No dreamId provided' });
  }

  const urls = [];
  for (const file of req.files) {
    const url = `/uploads/${file.filename}`;
    await ImageModel.addImage(dreamId, url);
    urls.push(url);
  }

  res.json({ urls });
});

app.get('/images/:dreamId', checkAuth, async (req, res) => {
  try {
    const { dreamId } = req.params;
    const images = await ImageModel.getImagesByDreamId(dreamId);
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/images/last/:dreamId', checkAuth, async (req, res) => {
  try {
    const { dreamId } = req.params;
    const deletedId = await ImageModel.deleteLastImageByDreamId(dreamId);
    res.json({ message: 'Last image deleted', deletedId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/dreams', checkAuth , updateOnline , DreamsController.getAllDreams);
app.get('/dreams/:id', checkAuth,updateOnline, DreamsController.getDreamById);
app.get('/dream/:id', checkAuth, updateOnline, DreamsController.getOneDreamById);
app.post('/dreams', checkAuth, updateOnline , dreamValidation , handleValidationErrors, DreamsController.createDream);
app.delete('/dreams/:id', checkAuth,updateOnline, DreamsController.deleteDream);
app.patch('/dreams/:id', checkAuth, updateOnline, updateValidation, handleValidationErrors, DreamsController.updateDream);



app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    }

  console.log('Server is running on http://localhost:5000');
});