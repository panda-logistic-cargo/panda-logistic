
import { ruTranslations } from './ru';
import { enTranslations } from './en';
import { zhTranslations } from './zh';

export const translations = {
  ru: ruTranslations,
  en: enTranslations,
  zh: zhTranslations
} as const;

export type Language = keyof typeof translations;

// Instead of manually listing all keys, we'll derive them from the ruTranslations object
// This ensures that all new keys will be automatically included in the type definition
export type TranslationKey = keyof typeof ruTranslations;

// This ensures all language files have the same keys
type TranslationsCheck = {
  [K in Language]: Record<TranslationKey, string>
};

// Type assertion to ensure all languages have all keys
const _translationsCheck: TranslationsCheck = translations;
