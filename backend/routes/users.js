const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('-password_hash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// PUT /api/users/me
router.put('/me', auth, async (req, res) => {
  const updates = {};
  if (req.body.username !== undefined && req.body.username !== '') updates.username = req.body.username;
  if (req.body.email !== undefined && req.body.email !== '') updates.email = req.body.email;
  if (req.body.preferences !== undefined) updates.preferences = req.body.preferences;
  const user = await User.findByIdAndUpdate(
    req.userId,
    updates,
    { new: true }
  ).select('-password_hash');
  res.json(user);
});

// PUT /api/users/me/password
router.put('/me/password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const valid = await bcrypt.compare(oldPassword, user.password_hash);
  if (!valid) return res.status(400).json({ message: 'Old password incorrect' });
  user.password_hash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password updated' });
});

// POST /api/users/me/avatar
router.post('/me/avatar', auth, async (req, res) => {
  // For simplicity, accept avatar_url in body (file upload can be added later)
  const { avatar_url } = req.body;
  const user = await User.findByIdAndUpdate(req.userId, { avatar_url }, { new: true }).select('-password_hash');
  res.json(user);
});

// DELETE /api/users/me
router.delete('/me', auth, async (req, res) => {
  await User.findByIdAndDelete(req.userId);
  res.json({ message: 'Account deleted' });
});

module.exports = router;
