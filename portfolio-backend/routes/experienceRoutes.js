const express = require('express');
const router = express.Router();
const {
  getAllExperience,
  createExperience,
  deleteExperience,
  getExperienceById,
  updateExperience,
} = require('../controllers/experienceController');

router.get('/', getAllExperience);
router.post('/', createExperience);
router.delete('/:id', deleteExperience);
router.get('/:id', getExperienceById);
router.put('/:id', updateExperience);

module.exports = router;
