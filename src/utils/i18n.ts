import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationFR from '../../translations/fr.json';
import translationEN from '../../translations/en.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            fr: {
                translation: translationFR,
            },
            en: {
                translation: translationEN,
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
            caches: ['localStorage', 'cookie'],
        },
    });

export default i18n;
