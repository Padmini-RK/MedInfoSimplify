const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to MedInfoSimplify Backend Services');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
