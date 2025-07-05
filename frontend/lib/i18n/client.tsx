'use client';

import { createContext, useContext, useState } from "react";
import { Locale, translations } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useI18n();
  return { t };
}

export function I18nProviderClient({
  children,
  locale: initialLocale = "en",
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = (key: string): string => {
    return translations[locale]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale: locale, setLocale: setLocale, t: t }}>
      {children}
    </I18nContext.Provider>
  );
}