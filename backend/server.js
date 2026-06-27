const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Imported Routes Layers
const authRoutes = require('./routes/authRoutes'); 
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load controllers and middleware for the proxy intercept handler
const { interceptAndGenerateAIQuiz } = require('./controllers/teacherController');
const { protect } = require('./middleware/authMiddleware');

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Standard Production Middlewares
app.use(cors());
app.use(express.json());

// 🔥 INTERCEPTOR HOOK: Frontend Teammate ke CreateQuiz manual payload ko handle karega
// Yeh line core router bindings se pehle run hogi taaki manual submission direct AI me transform ho jaye
app.post('/api/quiz', protect, interceptAndGenerateAIQuiz);

// Base Router Bindings
app.use('/api/auth', authRoutes); 
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);

// Fallback/Core dynamic quiz pipeline channel
app.use('/api/quiz', require('./routes/quizRoutes'));

// Base Route Test
app.get('/', (req, res) => {
  res.send('Knowledge Guru API running smoothly with Complete AI Integration...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🖥️  Server triggered successfully on port ${PORT}`);
});