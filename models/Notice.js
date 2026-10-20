const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Exam Notification', 'SSB Call Letter', 'New Batch Alert', 'Academy Notice', 'Result'],
    default: 'New Batch Alert'
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  linkUrl: {
    type: String,
    default: ''
  },
  pdfUrl: {
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

module.exports = mongoose.models.Notice || mongoose.model('Notice', noticeSchema);
