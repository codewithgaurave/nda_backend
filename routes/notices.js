const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// GET /api/notices (Public)
router.get('/', async (req, res) => {
  try {
    const notices = await dataService.getNotices();
    res.json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/notices/admin (Admin - includes inactive)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const notices = await dataService.getAllNoticesAdmin();
    res.json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/notices (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, date } = req.body;
    if (!title || !date) {
      return res.status(400).json({ success: false, message: 'Title and Date are required.' });
    }

    const newNotice = await dataService.createNotice(req.body);
    res.status(201).json({ success: true, data: newNotice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/notices/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dataService.updateNotice(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/notices/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteNotice(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
