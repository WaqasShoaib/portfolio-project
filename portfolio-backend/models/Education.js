const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
  },
  grade: {
    type: String, // e.g., "A+", "3.8 GPA"
  },
  achievements: {
    type: [String], // list of bullets like "Dean's List", "Top 5%"
    default: [],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Education', educationSchema);
