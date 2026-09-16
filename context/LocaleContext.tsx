"use client";
import {
  createI18n,
  defaultLocale,
  localeCookie,
  type Locale,
} from "@/lib/i18n";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useTransition,
} from "react";
import { I18nProvider as AriaI18nProvider } from "react-aria-components";

const fallback = {
  ...createI18n(defaultLocale),
  setLocale: (_locale: Locale) => {
    void _locale;
  },
  pending: false,
};
const Context = createContext(fallback);
export function LocaleProvider({
  locale: initialLocale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLanguage] = useState(initialLocale);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const i18n = useMemo(() => createI18n(locale), [locale]);
  function setLocale(next: Locale) {
    document.cookie = `${localeCookie}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    setLanguage(next);
    startTransition(() => router.refresh());
  }
  return (
    <Context.Provider value={{ ...i18n, setLocale, pending }}>
      <AriaI18nProvider locale={locale === "ar" ? "ar-SA" : "en-GB"}>
        {children}
      </AriaI18nProvider>
    </Context.Provider>
  );
}
export function useI18n() {
  return useContext(Context);
}
