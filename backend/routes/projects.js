const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();


router.post('/', protect, async (req, res) => {
  try {
    const { name, description } = req.body;


    if (!name || !description) {
      return res.status(400).json({
        message: 'Project name and description are required',
      });
    }

    
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: 'Unauthorized user',
      });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      teamMembers: [],
    });

    const populatedProject = await Project.findById(project._id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');

    res.status(201).json(populatedProject);
  } catch (error) {
    console.error('PROJECT CREATION ERROR:', error);

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name');

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/members', protect, async (req, res) => {
  try {
    const members = await User.find({
      role: { $regex: /^member$/i },
    }).select('name email');

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id/add-member', protect, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.teamMembers.includes(userId)) {
      project.teamMembers.push(userId);
    }

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/remove-member', protect, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.teamMembers = project.teamMembers.filter(
      (member) => member.toString() !== userId
    );

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;