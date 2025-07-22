// src/services/i18n.ts
import i18n, { CallbackError, InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import pa from "./translations/pa.json";
import en from "./translations/en.json";
import fr from "./translations/fr.json";
import ur from "./translations/ur.json";
import hi from "./translations/hi.json";
import es from "./translations/es.json";
import ja from "./translations/ja.json";

const STORE_LANGUAGE_KEY = "settings.lang";

// Define the shape of our language detector
interface LanguageDetectorOptions {
  name: string;
  lookupFromPathIndex?: number;
  lookupFromSubdomainIndex?: number;
  lookupQuerystring?: string;
  lookupCookie?: string;
  lookupLocalStorage?: string;
  lookupSessionStorage?: string;
  caches?: string[];
  order?: string[];
  excludeCacheFor?: string[];
  cookieMinutes?: number;
  cookieDomain?: string;
}

interface LanguageDetectorAsync {
  type: "languageDetector";
  async: true;
  init: (
    services: any,
    detectorOptions: LanguageDetectorOptions,
    i18nextOptions: InitOptions
  ) => void;
  detect: (callback: (lng: string) => void) => void;
  cacheUserLanguage: (lng: string) => void;
}

const languageDetector: LanguageDetectorAsync = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async (callback: (lng: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (savedLanguage) {
        return callback(savedLanguage);
      }
      return callback("en");
    } catch (error) {
      console.log("Error detecting language", error);
      callback("en");
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log("Error saving language", error);
    }
  },
};

const resources = {
  pa: {
    translation: pa,
  },
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  ur: {
    translation: ur,
  },
  hi: {
    translation: hi,
  },
  es: {
    translation: es,
  },
  ja: {
    translation: ja,
  },
};

const i18nOptions: InitOptions = {
  resources,
  compatibilityJSON: "v4",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init(i18nOptions, (err: CallbackError) => {
    if (err) {
      console.log("i18n initialization error", err);
    }
  });

export default i18n;
