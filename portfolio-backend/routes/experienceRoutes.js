const express = require('express');
const router = express.Router();
const {
  getAllExperience,
  createExperience,
  deleteExperience,
  getExperienceById
} = require('../controllers/experienceController');

router.get('/', getAllExperience);
router.post('/', createExperience);
router.delete('/:id', deleteExperience);
router.get('/:id', getExperienceById);

module.exports = router;
