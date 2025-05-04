
/**
 * Calculate reading time in minutes for a given text
 * @param text Content text to calculate reading time for
 * @param wordsPerMinute Average reading speed in words per minute
 * @returns Reading time in minutes
 */
export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
  // Count words in the text
  const wordCount = text.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
};

/**
 * Generate hashtags based on article content
 * @param title Article title
 * @param content Article content
 * @param category Article category
 * @returns Array of hashtags
 */
export const generateHashtags = (title: string, content: string, category: string): string[] => {
  // Common hashtags for articles
  const commonTags = ['статья', 'блог', 'логистика', 'китай'];
  
  // Add category as a hashtag
  const categoryTag = category.toLowerCase().replace(/\s+/g, '');
  
  // Extract important words from title
  const titleWords = title
    .toLowerCase()
    .replace(/[^\wа-яё\s]/gi, '') // Remove special characters
    .split(/\s+/)
    .filter(word => word.length > 3) // Only keep words longer than 3 chars
    .slice(0, 3); // Take at most 3 words from title
  
  // Create hashtags from title words
  const titleTags = titleWords.map(word => word);
  
  // Combine all tags and deduplicate
  const allTags = [...new Set([...titleTags, categoryTag, ...commonTags])];
  
  // Format tags with # prefix and return
  return allTags.map(tag => `#${tag}`);
};
