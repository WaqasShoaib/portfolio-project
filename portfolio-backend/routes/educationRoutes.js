const express = require('express');
const router = express.Router();
const {
  getAllEducation,
  createEducation,
  deleteEducation
} = require('../controllers/educationController');

router.get('/', getAllEducation);
router.post('/', createEducation);
router.delete('/:id', deleteEducation);

module.exports = router;
