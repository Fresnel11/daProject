'use client';

import { I18nProviderClient } from "@/lib/i18n/client.tsx";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nProviderClient>{children}</I18nProviderClient>;
}