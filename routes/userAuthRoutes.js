import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body; // use body, not query
    try {
        const user = await User.findOne({ username,password });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ token, userId: user._id ,username: user.name});

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

export default router;