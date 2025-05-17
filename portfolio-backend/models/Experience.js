const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: String, // e.g., "Jan 2022"
    required: true,
  },
  endDate: {
    type: String, // or "Present"
    required: true,
  },
  description: {
    type: String,
  },
  technologies: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('Experience', experienceSchema);
