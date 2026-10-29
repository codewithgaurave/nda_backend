const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  photoUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  featuredOnHome: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);

