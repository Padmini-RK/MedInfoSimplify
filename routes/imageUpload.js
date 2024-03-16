const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload');
const { processImage } = require('../services/imageProcessor');
const { extractText } = require('../services/textExtractor');

router.post('/upload', fileUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload at least one image file.'
    });
  }
  console.log('This is the path of the uploded file', req?.file?.path, req.file)
  // res.status(200).json({
  //   success: true,
  //   message: 'File uploaded successfully',
  //   file: req.file,
  // });
  const processedImagePath = './processed/' + req.file.filename.replace(/\.\w+$/, '.png'); // Define the path for the processed image

  // Image preprocessing with Sharp
  processImage(req.file.path, processedImagePath)
    .then(() => {
      // Text extraction with Tesseract.js
      extractText(processedImagePath)
        .then(text => {
          res.status(200).json({
            success: true,
            message: 'File uploaded and processed successfully',
            file: req.file,
            extractedText: text // Return the extracted text in the response
          });
        })
        .catch(error => {
          console.error('Error during text extraction:', error);
          res.status(500).json({
            success: false,
            message: 'Error extracting text from the image.',
            error: error.message
          });
        });
    })
    .catch(error => {
      console.error('Error processing image:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing image.',
        error: error.message
      });
    });
});


module.exports = router;
