const sharp = require('sharp');

const processImage = async (inputPath, outputPath) => {
  const outputPngPath = outputPath.endsWith('.png') ? outputPath : outputPath.replace(/\.\w+$/, '.png');
  try {
    await sharp(inputPath)
      .resize(1000) // Rescale the image to make it larger
      .toColourspace('b-w') // Further binarization 
      .toFormat('png') // Convert to PNG
      .toFile(outputPngPath);
    return outputPngPath;
  } catch (error) {
    throw error; // Propagate error
  }
};

module.exports = { processImage };

// sharp(inputImagePath)
//   .resize({
//     width: 2000, 
//     withoutEnlargement: true // Ensures the image is not enlarged beyond its original size
//   })
//   .greyscale() // Convert the image to grayscale
//   .sharpen() // Sharpen the image slightly to enhance text edges
//   .normalize() // Normalize the image to enhance contrast
//   .png() // Convert to PNG format
//   .toFile(outputImagePath, (err, info) => {
//     if (err) throw err;
//     console.log(`Image processed and saved as ${outputImagePath}`, info);
//   });

//   sharp(inputImagePath)
//   .greyscale() // Convert the image to grayscale
//   .resize({ 
//     width: 1000, 
//     fit: sharp.fit.cover,
//     withoutEnlargement: true
//   })
//   .blur(0.3) // Apply a slight blur to reduce noise
//   .linear(1.2, 10) // Apply linear adjustment to increase contrast
//   .png() // Convert to PNG format
//   .toFile(outputImagePath, (err, info) => {
//     if (err) throw err;
//     console.log(`Image processed and saved as ${outputImagePath}`, info);
//   });