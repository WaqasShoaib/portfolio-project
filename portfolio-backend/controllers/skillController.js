const Skill = require('../models/Skill');

// Get all skills or filter by type
const getSkills = async (req, res) => {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const skills = await Skill.find(filter);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new skill
const createSkill = async (req, res) => {
  const { name, type, icon } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: 'Name and type are required' });
  }

  if (!['core', 'exploring'].includes(type)) {
    return res.status(400).json({ message: 'Type must be either core or exploring' });
  }

  try {
    const skill = new Skill({ name, type, icon });
    const saved = await skill.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a skill by ID
const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  deleteSkill,
  getSkillById,
};



