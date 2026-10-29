const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// GET /api/candidates (Public - all selected candidates)
router.get('/', async (req, res) => {
  try {
    const list = await dataService.getCandidates();
    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/candidates (Admin - add selected candidate)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { photoUrl } = req.body;
    if (!photoUrl) {
      return res.status(400).json({ success: false, message: 'Candidate Photo is required.' });
    }
    const newCadet = await dataService.createCandidate(req.body);
    res.status(201).json({ success: true, data: newCadet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/candidates/:id (Admin - update selected candidate)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dataService.updateCandidate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/candidates/:id (Admin - delete selected candidate)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteCandidate(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.json({ success: true, message: 'Candidate deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

