export interface LanguageDefinition {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", direction: "ltr" },
];

export const DEFAULT_LANGUAGE = "es";
