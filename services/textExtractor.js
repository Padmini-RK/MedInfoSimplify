const { recognize } = require('tesseract.js');
const { cleanAndNormalizeText } = require('../utils/textCleaner');

const extractText = async (imagePath) => {
  try {
    const { data: { text } } = await recognize(imagePath, 'eng', {
      logger: m => console.log(m), // Log progress to the console
      tessedit_pageseg_mode: 3 // Set Page Segmentation Mode to '3' for automatic orientation detection
    });
    console.log('Extracted text before cleaning:', text);
    
    // Clean and normalize the extracted text
    const cleanedText = cleanAndNormalizeText(text);
    console.log('Cleaned and normalized text:', cleanedText);

    return cleanedText; // Return the cleaned and normalized text
  } catch (error) {
    console.error('Error during text extraction:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = { extractText };
