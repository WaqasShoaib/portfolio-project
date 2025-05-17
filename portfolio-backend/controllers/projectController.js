const Project = require('../models/Project');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new project
const createProject = async (req, res) => {
  const { title, description, technologies, githubLink, liveDemoLink } = req.body;

  // Manual validation
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Title is required and must be a string.' });
  }

  if (technologies && !Array.isArray(technologies)) {
    return res.status(400).json({ message: 'Technologies must be an array.' });
  }

  const project = new Project({
    title,
    description,
    technologies,
    githubLink,
    liveDemoLink,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProjects,
  createProject,
};
