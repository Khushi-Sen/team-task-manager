const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

router.post('/', auth, async (req,res)=>{
  const project = await Project.create({...req.body, createdBy:req.user.id});
  res.json(project);
});

router.get('/', auth, async (req,res)=>{
  const projects = await Project.find();
  res.json(projects);
});

module.exports = router;