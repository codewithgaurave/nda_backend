const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// GET /api/gallery (Public - optional category query)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const items = await dataService.getGallery(category);
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/gallery (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Title and Image URL are required.' });
    }

    const newItem = await dataService.createGalleryItem(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/gallery/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteGalleryItem(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
