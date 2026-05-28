import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import { DEFAULT_LANGUAGE, LANGUAGE_CODES, normalizeLanguageCode } from './languages';

const getInitialLanguage = () => {
  const savedLanguage =
    typeof window !== 'undefined' ? window.localStorage.getItem('lang') : undefined;
  if (savedLanguage) return normalizeLanguageCode(savedLanguage);

  return normalizeLanguageCode(typeof navigator !== 'undefined' ? navigator.language : undefined);
};

i18n
  .use(initReactI18next)
  .init({
    showSupportNotice: false,
    resources: {
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
      zh: { translation: zh },
      ar: { translation: ar },
      hi: { translation: hi },
      te: { translation: te },
    },
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGE_CODES,
    load: 'languageOnly',
    cleanCode: true,
    returnEmptyString: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  const normalizedLanguage = normalizeLanguageCode(lng);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('lang', normalizedLanguage);
  }

  if (lng !== normalizedLanguage) {
    void i18n.changeLanguage(normalizedLanguage);
  }
});

export default i18n;
