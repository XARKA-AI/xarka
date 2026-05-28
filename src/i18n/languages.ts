export const DEFAULT_LANGUAGE = "en";

export const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "te", label: "తెలుగు", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "zh", label: "中文", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const LANGUAGE_CODES = LANGUAGES.map((language) => language.code);

const SUPPORTED_LANGUAGE_CODES = new Set<string>(LANGUAGE_CODES);

export function normalizeLanguageCode(language?: string | null): LanguageCode {
  const code = language?.toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGE_CODES.has(code ?? "")
    ? (code as LanguageCode)
    : DEFAULT_LANGUAGE;
}

export function getLanguageDirection(language?: string | null) {
  return LANGUAGES.find((item) => item.code === normalizeLanguageCode(language))?.dir ?? "ltr";
}
