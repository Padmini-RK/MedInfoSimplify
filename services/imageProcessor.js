const sharp = require('sharp');

const processImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(2000) // Rescale the image to make it larger
      .toColourspace('b-w') // Further binarization if needed
      .toFormat('jpeg') // Convert to JPEG
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    throw error; // Propagate error
  }
};

module.exports = { processImage };