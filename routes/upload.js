const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const sanitizedName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
  }
});

// File filter for images and PDF documents
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'application/pdf'
  ];
  const isPdfExt = file.originalname.toLowerCase().endsWith('.pdf');
  if (allowedMimes.includes(file.mimetype) || isPdfExt) {
    cb(null, true);
  } else {
    cb(new Error('Only Image files (JPG, PNG, WEBP) or PDF documents are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB limit
  fileFilter
});

// POST /api/upload (Supports single or any field name: image, file, document, pdf)
router.post('/', (req, res) => {
  upload.any()(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const uploadedFile = (req.files && req.files[0]) || req.file;
    if (!uploadedFile) {
      return res.status(400).json({ success: false, message: 'Please select an image or PDF file to upload.' });
    }

    const host = req.get('host') || 'localhost:5001';
    const protocol = req.protocol || 'http';
    const fileUrl = `${protocol}://${host}/uploads/${uploadedFile.filename}`;
    const isPdf = uploadedFile.mimetype === 'application/pdf' || uploadedFile.filename.toLowerCase().endsWith('.pdf');

    res.json({
      success: true,
      message: `${isPdf ? 'PDF document' : 'Image'} uploaded successfully!`,
      url: fileUrl,
      filename: uploadedFile.filename,
      originalName: uploadedFile.originalname,
      fileType: isPdf ? 'pdf' : 'image',
      size: uploadedFile.size
    });
  });
});

module.exports = router;
