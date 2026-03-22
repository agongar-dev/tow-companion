import i18n from "i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import cat from "./locales/cat.json";
import { initReactI18next } from "react-i18next";
import { loadString } from "../../lib/mmkv/storage";


export enum Languages {
    English = "en",
    Spanish = "es",
    Catalan = "cat",
}

const STORAGE_KEY = "language";
const fallbackLng = "en";
const savedLanguage = loadString(STORAGE_KEY) ?? fallbackLng;

i18n.use(initReactI18next).init({  
    
    lng: savedLanguage,
    fallbackLng,
    resources: {
        en: {
            translation: en,
        },
        es: {
            translation: es,
        },
        cat: {
            translation: cat,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;    