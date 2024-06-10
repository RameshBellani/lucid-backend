const express = require('express');
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newBlog = new Blog({ title, content, author: req.user.id });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
