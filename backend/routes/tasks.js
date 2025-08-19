const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user_id: req.userId });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const { title, description, due_date, priority } = req.body;
  const task = new Task({ user_id: req.userId, title, description, due_date, priority });
  await task.save();
  res.json(task);
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, due_date, priority, status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user_id: req.userId },
    { title, description, due_date, priority, status },
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted' });
});

module.exports = router;
