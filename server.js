const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');

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

app.get('/', (req, res) => {
    res.send('Welcome to MedInfoSimplify Backend Services');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
