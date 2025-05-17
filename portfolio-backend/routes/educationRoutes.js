const express = require('express');
const router = express.Router();
const {
  getAllEducation,
  createEducation,
  deleteEducation,
  getEducationById
} = require('../controllers/educationController');

router.get('/', getAllEducation);
router.post('/', createEducation);
router.delete('/:id', deleteEducation);
router.get('/:id', getEducationById);

module.exports = router;
