import type { TranslationMap } from "@/types/project";
import { DEFAULT_LANGUAGE } from "@/constants/languages";

/**
 * Resolves a TranslationMap to a string for the requested language,
 * falling back to the default language, then to the first available value.
 */
export const t = (
  map: TranslationMap | undefined,
  lang: string,
  fallback = ""
): string => {
  if (!map) return fallback;
  return map[lang] ?? map[DEFAULT_LANGUAGE] ?? Object.values(map)[0] ?? fallback;
};

export const createEmptyTranslationMap = (languages: string[]): TranslationMap =>
  Object.fromEntries(languages.map((lang) => [lang, ""]));
