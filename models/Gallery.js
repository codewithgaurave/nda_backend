const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: [
      'GTO Obstacle Ground',
      'SSB Mock Interview',
      'Smart Classrooms',
      'Recommended Cadets',
      'Physical Training & Drill'
    ],
    default: 'GTO Obstacle Ground'
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
