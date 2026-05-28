import { describe, expect, it } from "vitest";

import ar from "./locales/ar.json";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import hi from "./locales/hi.json";
import te from "./locales/te.json";
import zh from "./locales/zh.json";
import i18n from "./index";
import { LANGUAGES, getLanguageDirection, normalizeLanguageCode } from "./languages";

const resources = { ar, de, en, es, fr, hi, te, zh };

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return prefix ? [prefix] : [];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("language configuration", () => {
  it("normalizes regional and unsupported language codes", () => {
    expect(normalizeLanguageCode("es-MX")).toBe("es");
    expect(normalizeLanguageCode("hi-IN")).toBe("hi");
    expect(normalizeLanguageCode("pt-BR")).toBe("en");
  });

  it("sets RTL direction only for Arabic", () => {
    expect(getLanguageDirection("ar")).toBe("rtl");
    expect(getLanguageDirection("en")).toBe("ltr");
  });

  it("has complete locale resources for every selectable language", () => {
    const englishKeys = new Set(flattenKeys(en));

    for (const { code } of LANGUAGES) {
      expect(resources[code]).toBeDefined();

      const keys = new Set(flattenKeys(resources[code]));
      const missingKeys = [...englishKeys].filter((key) => !keys.has(key));

      expect(missingKeys).toEqual([]);
    }
  });

  it("changes translated copy and persists the selected language", async () => {
    await i18n.changeLanguage("hi");

    expect(i18n.t("nav.platform")).toBe("प्लेटफ़ॉर्म");
    expect(i18n.t("hero.titleReveal", { returnObjects: true })).toEqual([
      "बुद्धिमत्ता",
      "इन्फ्रास्ट्रक्चर",
      "नियंत्रण",
    ]);
    expect(localStorage.getItem("lang")).toBe("hi");
  });
});
