const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes'); // Imported Routes
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Standard Production Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);

// Routes Integration
app.use('/api/auth', authRoutes); // All endpoints will start with /api/auth

// Base Route Test
app.get('/', (req, res) => {
  res.send('Knowledge Guru API running smoothly...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🖥️  Server triggered successfully on port ${PORT}`);
});