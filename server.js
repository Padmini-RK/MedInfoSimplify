const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer'); 
require('dotenv').config();

const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/imageUpload');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to MedInfoSimplify Backend Services');
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.cause === 'UnsupportedFileType') {
      return res.status(400).json({ success: false, message: 'Only JPEG, JPG, and PNG files are allowed.' });
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File size exceeds limit. Maximum allowed size is 1MB.'});
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ success: false, message: 'Only single file upload is allowed. Please upload one file at a time.' });
    }

    console.log('error', err);
    return res.status(500).json({ success: false, message: 'An error occurred.' });
  }
   
  next(); 
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
