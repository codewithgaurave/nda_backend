const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const Course = require('../models/Course');
const Enquiry = require('../models/Enquiry');
const Notice = require('../models/Notice');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Admin = require('../models/Admin');
const {
  initialCourses,
  initialNotices,
  initialBlogs,
  initialGallery,
  initialEnquiries
} = require('../seedData');

let isMongoConnected = false;
const dataDir = path.join(__dirname, '../data');
const storeFile = path.join(dataDir, 'store.json');

// Ensure local fallback data file exists
function initLocalStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(storeFile)) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin@12345', salt);

    const initialStore = {
      courses: initialCourses.map((c, i) => ({ ...c, _id: `c_${i + 1}`, createdAt: new Date().toISOString() })),
      notices: initialNotices.map((n, i) => ({ ...n, _id: `n_${i + 1}`, createdAt: new Date().toISOString() })),
      blogs: initialBlogs.map((b, i) => ({ ...b, _id: `b_${i + 1}`, createdAt: new Date().toISOString() })),
      gallery: initialGallery.map((g, i) => ({ ...g, _id: `g_${i + 1}`, createdAt: new Date().toISOString() })),
      enquiries: initialEnquiries.map((e, i) => ({ ...e, _id: `e_${i + 1}`, createdAt: new Date().toISOString() })),
      admins: [
        {
          _id: 'a_1',
          name: 'Commandant Admin',
          email: (process.env.ADMIN_EMAIL || 'admin@ndassb.academy').toLowerCase(),
          password: hashedPassword,
          role: 'Super Admin',
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(storeFile, JSON.stringify(initialStore, null, 2));
  }
}

function readLocalStore() {
  initLocalStore();
  try {
    const raw = fs.readFileSync(storeFile, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { courses: [], notices: [], blogs: [], gallery: [], enquiries: [], admins: [] };
  }
}

function writeLocalStore(data) {
  try {
    fs.writeFileSync(storeFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write local store:', err.message);
  }
}

async function seedMongoDb() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@12345', salt);
      await Admin.create({
        name: 'Commandant Admin',
        email: (process.env.ADMIN_EMAIL || 'admin@ndassb.academy').toLowerCase(),
        password: hashedPassword,
        role: 'Super Admin'
      });
      console.log('✅ Default Admin seeded in MongoDB: admin@ndassb.academy / Admin@12345');
    }

    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany(initialCourses);
      console.log('✅ Initial Courses seeded in MongoDB');
    }

    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany(initialNotices);
      console.log('✅ Initial Notices seeded in MongoDB');
    }

    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(initialBlogs);
      console.log('✅ Initial Blogs seeded in MongoDB');
    }

    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.insertMany(initialGallery);
      console.log('✅ Initial Gallery items seeded in MongoDB');
    }

    const enquiryCount = await Enquiry.countDocuments();
    if (enquiryCount === 0) {
      await Enquiry.insertMany(initialEnquiries);
      console.log('✅ Initial Enquiries seeded in MongoDB');
    }
  } catch (error) {
    console.error('⚠️ Seeding error in MongoDB:', error.message);
  }
}

const connectDB = async () => {
  initLocalStore();
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ndassb_academy';

  try {
    console.log(`Connecting to MongoDB at: ${uri} ...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    isMongoConnected = true;
    console.log('🚀 Connected to MongoDB successfully!');
    await seedMongoDb();
  } catch (err) {
    isMongoConnected = false;
    console.log('ℹ️  MongoDB server is not reachable locally. Seamlessly running in fallback persistent mode with real defense seed data.');
    console.log('💡 Once your MongoDB service is started, provide MONGODB_URI in backend/.env to persist directly to MongoDB.');
  }
};

module.exports = {
  connectDB,
  getIsMongoConnected: () => isMongoConnected,
  readLocalStore,
  writeLocalStore
};
