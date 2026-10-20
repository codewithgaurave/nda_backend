const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');
const { getIsMongoConnected } = require('../config/db');

// GET /api/dashboard/stats (Admin only)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const [courses, enquiries, contacts, notices, blogs, gallery] = await Promise.all([
      dataService.getCourses(),
      dataService.getEnquiries(),
      dataService.getContacts(),
      dataService.getAllNoticesAdmin(),
      dataService.getAllBlogsAdmin(),
      dataService.getGallery()
    ]);

    const pendingEnquiries = enquiries.filter(e => e.status === 'Pending').length;
    const contactedEnquiries = enquiries.filter(e => e.status === 'Contacted').length;
    const enrolledEnquiries = enquiries.filter(e => e.status === 'Enrolled').length;
    const totalContacts = contacts.length;
    const pendingContacts = contacts.filter(c => c.status === 'Pending').length;

    res.json({
      success: true,
      data: {
        totalEnquiries: enquiries.length,
        pendingEnquiries,
        contactedEnquiries,
        enrolledEnquiries,
        totalContacts,
        pendingContacts,
        totalCourses: courses.length,
        totalNotices: notices.length,
        totalBlogs: blogs.length,
        totalGalleryItems: gallery.length,
        isMongoConnected: getIsMongoConnected(),
        recentEnquiries: enquiries.slice(0, 5),
        recentContacts: contacts.slice(0, 5),
        recentNotices: notices.slice(0, 4)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
