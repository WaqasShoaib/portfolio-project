const Education = require('../models/Education');

// GET all education entries
const getAllEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new education entry
const createEducation = async (req, res) => {
  const { degree, institution, startYear, endYear, grade, achievements, description } = req.body;

  if (!degree || !institution || !startYear) {
    return res.status(400).json({ message: 'Degree, institution, and start year are required.' });
  }

  try {
    const edu = new Education({
    degree,
    institution,
    startYear,
    endYear,
    grade,
    achievements,
    description,
    });
    const saved = await edu.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE education entry
const deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Education record not found' });
    res.json({ message: 'Education record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEducation,
  createEducation,
  deleteEducation,
  getEducationById,
};
