import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  SUPPORTED_LANGUAGES,
  LanguageOption,
  Translations,
  TRANSLATIONS,
} from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLangInfo: LanguageOption;
  isRtl: boolean;
  t: (key: keyof Translations) => string;
  currency: 'MAD' | 'USD';
  setCurrency: (c: 'MAD' | 'USD') => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  soundAlerts: boolean;
  setSoundAlerts: (enabled: boolean) => void;
  formatPrice: (amountMAD: number, amountUSD?: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'so9fiadak_lang';
const STORAGE_CURRENCY_KEY = 'so9fiadak_currency';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved && (saved === 'ar' || saved === 'darija' || saved === 'fr' || saved === 'en')) {
        return saved as Language;
      }
    } catch {
      // fallback
    }
    return 'ar'; // Default Arabic as requested
  });

  const [currency, setCurrencyState] = useState<'MAD' | 'USD'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENCY_KEY);
      if (saved === 'MAD' || saved === 'USD') return saved;
    } catch {
      // fallback
    }
    return 'MAD';
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);

  const currentLangInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const isRtl = currentLangInfo.dir === 'rtl';

  // Synchronize document direction and lang attributes
  useEffect(() => {
    const dir = currentLangInfo.dir;
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language === 'darija' ? 'ar-MA' : language);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch {
      // ignore
    }
  }, [language, currentLangInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CURRENCY_KEY, currency);
    } catch {
      // ignore
    }
  }, [currency]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrency = (c: 'MAD' | 'USD') => {
    setCurrencyState(c);
  };

  const t = (key: keyof Translations): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['ar'];
    return dict[key] || TRANSLATIONS['ar'][key] || key;
  };

  const formatPrice = (amountMAD: number, amountUSD?: number): string => {
    if (currency === 'USD') {
      const usdVal = amountUSD !== undefined ? amountUSD : Math.round(amountMAD / 10);
      return `$${usdVal}`;
    }
    const unit = t('dhCurrency');
    return `${amountMAD} ${unit}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLangInfo,
        isRtl,
        t,
        currency,
        setCurrency,
        notificationsEnabled,
        setNotificationsEnabled,
        soundAlerts,
        setSoundAlerts,
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
