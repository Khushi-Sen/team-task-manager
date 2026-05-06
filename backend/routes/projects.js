const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/adminMiddleware');

const router = express.Router();

// CREATE PROJECT
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      teamMembers: [],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PROJECTS
router.get('/', protect, async (req, res) => {
  try {
    let projects;

    if (req.user.role.toLowerCase() === 'admin') {
      projects = await Project.find()
        .populate('teamMembers', 'name email')
        .populate('createdBy', 'name');
    } else {
      projects = await Project.find({
        teamMembers: req.user._id,
      })
        .populate('teamMembers', 'name email')
        .populate('createdBy', 'name');
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE PROJECT
router.delete('/:id', protect, adminOnly, async (req, res) => {
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

// GET MEMBERS
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

// ADD MEMBER
router.put('/:id/add-member', protect, adminOnly, async (req, res) => {
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

// REMOVE MEMBER
router.put('/:id/remove-member', protect, adminOnly, async (req, res) => {
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