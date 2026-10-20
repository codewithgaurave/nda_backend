const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  courseInterested: {
    type: String,
    required: true,
    default: 'SSB 14 Days Training'
  },
  city: {
    type: String,
    default: ''
  },
  qualification: {
    type: String,
    default: ''
  },
  targetExamYear: {
    type: String,
    default: '2026'
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Enrolled', 'Closed'],
    default: 'Pending'
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
