import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST: Add new user
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const newUser = new User({ name, email, role: Number(role) });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;