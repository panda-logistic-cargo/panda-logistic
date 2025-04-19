
import { ruTranslations } from './ru';
import { enTranslations } from './en';
import { zhTranslations } from './zh';

export const translations = {
  ru: ruTranslations,
  en: enTranslations,
  zh: zhTranslations
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof ruTranslations;

// This ensures all language files have the same keys
// TypeScript will error if any language is missing keys
type TranslationsCheck = {
  [K in Language]: Record<TranslationKey, string>
};

// Type assertion to ensure all languages have all keys
const _translationsCheck: TranslationsCheck = translations;
