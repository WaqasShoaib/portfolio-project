const Experience = require('../models/Experience');

// GET all experiences
const getAllExperience = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new experience
const createExperience = async (req, res) => {
  const { role, company, startDate, endDate, description, technologies } = req.body;

  if (!role || !company || !startDate || !endDate) {
    return res.status(400).json({ message: 'Role, company, start date, and end date are required.' });
  }

  try {
    const experience = new Experience({ role, company, startDate, endDate, description, technologies });
    const saved = await experience.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE experience
const deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExperience,
  createExperience,
  deleteExperience,
};
