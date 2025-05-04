
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

/**
 * Create a URL slug from a string
 * @param text Text to convert to slug
 * @returns URL-friendly slug
 */
export const createSlug = (text: string): string => {
  // Transliteration map for Cyrillic characters
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  return text
    .toLowerCase()
    // Transliterate Cyrillic characters
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    // Replace special characters with hyphens
    .replace(/[^\w\s-]/g, '')
    // Replace spaces with hyphens
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length to avoid very long URLs
    .substring(0, 60);
};
