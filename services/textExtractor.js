const { recognize } = require('tesseract.js');

const extractText = async (imagePath) => {
  try {
    const { data: { text } } = await recognize(imagePath, 'eng', {
      logger: m => console.log(m), // Log progress to the console
      essedit_pageseg_mode: 3 // Set Page Segmentation Mode to '3' for automatic orientation detection
    });
    console.log('text--->', text);
    return text;
  } catch (error) {
    console.error('Error during text extraction:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = { extractText };
