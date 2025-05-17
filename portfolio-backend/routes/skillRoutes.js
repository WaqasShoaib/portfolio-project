const express = require('express');
const router = express.Router();
const { getSkills, createSkill, deleteSkill,getSkillById } = require('../controllers/skillController');

router.get('/', getSkills);
router.post('/', createSkill);
router.delete('/:id', deleteSkill);
router.get('/:id', getSkillById);

module.exports = router;
