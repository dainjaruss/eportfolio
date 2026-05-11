const express = require('express');
const multer  = require('multer');
const path    = require('path');

const router = express.Router();

const { uploadToR2 } = require('../utils/s3');

// Use memoryStorage to get the file buffer for cloud upload
const storage = multer.memoryStorage();

// Only allow images
const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp/;
  const ext  = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  cb(ext && mime ? null : new Error('Images only (jpeg, jpg, png, gif, webp)'), ext && mime);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 }, // 4 MB cap for Vercel compatibility
});

const auth = require('../middleware/auth');

// POST /api/upload — accepts a single file field named "file"
router.post('/', auth, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file received' });
  }

  try {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${path.extname(req.file.originalname)}`;
    const cloudUrl = await uploadToR2(req.file.buffer, fileName, req.file.mimetype);

    res.json({
      success: true,
      filename: fileName,
      url: cloudUrl,
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Failed to upload to cloud storage' });
  }
});

// Multer error handler (file type / size rejections)
router.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message });
});

module.exports = router;
