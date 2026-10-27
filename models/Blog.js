const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['SSB Interview Guide', 'NDA Written Strategy', 'Physical & Medical', 'Current Affairs & Defense'],
    default: 'SSB Interview Guide'
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      default: 'Col. Rajesh Sharma (Retd. SSB Senior Assessor)'
    },
    designation: {
      type: String,
      default: 'Chief SSB Mentor'
    }
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  tags: [{
    type: String
  }],
  coverImage: {
    type: String,
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
