const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['core', 'exploring'],
    required: true,
  },
  icon: String, // optional: URL to a tech logo
});

module.exports = mongoose.model('Skill', skillSchema);
