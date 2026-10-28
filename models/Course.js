const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: [
      'Offline Mode SSB',
      'Online Mode SSB',
      'NDA & CDS Written',
      'SSB Offline',
      'SSB Online',
      'Written Exam',
      'NDA Written',
      'SSB 10 Days Training',
      'SSB 14 Days Training',
      'CDS / AFCAT',
      'Foundation'
    ],
    default: 'Offline Mode SSB'
  },
  duration: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  batchStartDate: {
    type: String,
    required: true
  },
  timings: {
    type: String,
    default: '9:00 AM - 4:00 PM'
  },
  description: {
    type: String,
    required: true
  },
  highlights: [{
    type: String
  }],
  syllabus: [{
    moduleName: String,
    topics: [String]
  }],
  batchSize: {
    type: String,
    default: '35 Cadets per Batch'
  },
  badge: {
    type: String,
    default: 'Popular'
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
