const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// POST /api/enquiries (Public - Admission Lead form)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, courseInterested } = req.body;
    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: 'Name, Phone and Email are required.' });
    }

    const enquiry = await dataService.createEnquiry(req.body);
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our Senior Defence Counselor will call you within 24 hours.',
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/enquiries (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, course } = req.query;
    const enquiries = await dataService.getEnquiries({ status, course });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/enquiries/:id (Admin - update status or notes)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dataService.updateEnquiry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/enquiries/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteEnquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
