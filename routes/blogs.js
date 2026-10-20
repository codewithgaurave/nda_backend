const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// GET /api/blogs (Public - published only)
router.get('/', async (req, res) => {
  try {
    const blogs = await dataService.getBlogs();
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/blogs/admin (Admin - all)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const blogs = await dataService.getAllBlogsAdmin();
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/blogs/:slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await dataService.getBlogBySlug(req.params.slug);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/blogs (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ success: false, message: 'Title, summary, and content are required.' });
    }

    const newBlog = await dataService.createBlog(req.body);
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/blogs/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dataService.updateBlog(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/blogs/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteBlog(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }
    res.json({ success: true, message: 'Blog article deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
