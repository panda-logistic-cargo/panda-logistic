
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
