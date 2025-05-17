const express = require('express');
const router = express.Router();
const {
  getAllExperience,
  createExperience,
  deleteExperience
} = require('../controllers/experienceController');

router.get('/', getAllExperience);
router.post('/', createExperience);
router.delete('/:id', deleteExperience);

module.exports = router;
