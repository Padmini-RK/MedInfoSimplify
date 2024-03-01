const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload');

router.post('/upload', fileUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload at least one image file.'
    });
  }

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    file: req.file,
  });
});


module.exports = router;
