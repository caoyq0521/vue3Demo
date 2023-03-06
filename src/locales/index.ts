import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';

const messages = {
  en,
  zh
}

const getCurrentLanguage = () => {
  const language = (navigator.language || 'zh').toLocaleLowerCase();
  return localStorage.getItem('lang') || language.split('-')[0] || 'zh';
}

const i18n = createI18n({
  legacy: false,
  locale: getCurrentLanguage(),
  fallbackLocale: 'zh',
  globalInjection: true,
  messages,
});

export default i18n;