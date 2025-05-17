const express = require('express');
const router = express.Router();
const {
  getAllEducation,
  createEducation,
  deleteEducation,
  getEducationById,
  updateEducation
} = require('../controllers/educationController');

router.get('/', getAllEducation);
router.post('/', createEducation);
router.delete('/:id', deleteEducation);
router.get('/:id', getEducationById);
router.put('/:id', updateEducation);

module.exports = router;
