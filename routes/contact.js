const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// POST /api/contact (Public - Contact Us / Send us a Message Form)
// Required Fields: name, email, phone, course (or courseInterested)
// Optional Field: message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const course = req.body.course || req.body.courseInterested;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Your Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Your Email is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone Number is required.' });
    }
    if (!course || !course.trim()) {
      return res.status(400).json({ success: false, message: 'Please select a Course.' });
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      course: course.trim(),
      message: message ? message.trim() : ''
    };

    const contact = await dataService.createContact(payload);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Our Senior Defence Counselor will call you within 24 hours.',
      data: contact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error while sending message.' });
  }
});

// GET /api/contact (Admin - View all contact inquiries)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, course } = req.query;
    const contacts = await dataService.getContacts({ status, course });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contact/:id (Admin - Update contact status or notes)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dataService.updateContact(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Contact message not found.' });
    }
    res.json({ success: true, message: 'Contact updated successfully.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/:id (Admin - Delete contact message)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteContact(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Contact message not found.' });
    }
    res.json({ success: true, message: 'Contact message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
