require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getIsMongoConnected } = require('./config/db');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const enquiryRoutes = require('./routes/enquiries');
const noticeRoutes = require('./routes/notices');
const blogRoutes = require('./routes/blogs');
const galleryRoutes = require('./routes/gallery');
const candidateRoutes = require('./routes/candidates');
const dashboardRoutes = require('./routes/dashboard');
const uploadRoutes = require('./routes/upload');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Shaurya NDA & SSB Academy Backend API',
    database: getIsMongoConnected() ? 'MongoDB (Connected)' : 'Fallback Storage (Ready for MongoDB)'
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.send('🇮🇳 Shaurya NDA & SSB Academy Backend API is running on port ' + PORT);
});

// Start Server & Connect Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🎖️  SHAURYA NDA & SSB ACADEMY BACKEND RUNNING`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🛡️  Admin Account: ${process.env.ADMIN_EMAIL || 'admin@ndassb.academy'}`);
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'Admin@12345'}`);
    console.log(`======================================================\n`);
  });
});
