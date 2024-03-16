function cleanAndNormalizeText(text) {
    // Remove unwanted characters or symbols
    const withoutUnwantedChars = text.replace(/[^a-zA-Z0-9 ,.!?;:()'=&"-]/g, '');
  
    // Normalize whitespace and remove improper line breaks
    const normalizedSpace = withoutUnwantedChars.replace(/\s+/g, ' ').trim();
    // const withoutImproperLineBreaks = normalizedSpace.replace(/([a-zA-Z]),?\n([a-zA-Z])/g, '$1 $2');
  
    return normalizedSpace;
  }
  
  module.exports = { cleanAndNormalizeText };
  