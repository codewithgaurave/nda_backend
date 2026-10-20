const express = require('express');
const router = express.Router();
const dataService = require('../utils/dataHelper');
const authMiddleware = require('../middleware/auth');

// GET /api/courses (Public)
router.get('/', async (req, res) => {
  try {
    const courses = await dataService.getCourses();
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/courses/:id (Public)
router.get('/:id', async (req, res) => {
  try {
    const course = await dataService.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/courses (Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, duration, fees, description } = req.body;
    if (!title || !duration || !fees || !description) {
      return res.status(400).json({ success: false, message: 'Required fields: title, duration, fees, description' });
    }

    const courseData = {
      ...req.body,
      code: req.body.code || ('COURSE-' + Date.now().toString().slice(-4))
    };

    const newCourse = await dataService.createCourse(courseData);
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/courses/:id (Admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await dataService.updateCourse(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/courses/:id (Admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await dataService.deleteCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
