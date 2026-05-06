const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req,res)=>{
  const task = await Task.create(req.body);
  res.json(task);
});

router.get('/', auth, async (req,res)=>{
  const tasks = await Task.find().populate('assignedTo project');
  res.json(tasks);
});

router.put('/:id', auth, async (req,res)=>{
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

module.exports = router;