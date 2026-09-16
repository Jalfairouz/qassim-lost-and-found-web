import { ApiError } from "@/lib/api";
import ar from "@/locales/ar";
import en from "@/locales/en";

export type Locale = "ar" | "en";
export type MessageKey = keyof typeof en;
export const localeCookie = "qlf_locale";
export const defaultLocale: Locale = "en";
export function isLocale(value: unknown): value is Locale {
  return value === "ar" || value === "en";
}
const dictionaries = { en, ar };
const collegeKeys: MessageKey[] = [
  "colleges.medical",
  "colleges.business",
  "colleges.computer",
  "colleges.dentistry",
  "colleges.engineering",
  "colleges.medicine",
  "colleges.pharmacy",
  "colleges.science",
  "colleges.other",
];
export function createI18n(locale: Locale) {
  const intlLocale = locale === "ar" ? "ar-SA-u-ca-gregory" : "en-GB";
  const number = (value: number) =>
    new Intl.NumberFormat(intlLocale).format(value);
  const t = (
    key: MessageKey,
    values: Record<string, string | number> = {},
  ): string =>
    dictionaries[locale][key].replace(/\{(\w+)\}/g, (_, name: string) =>
      typeof values[name] === "number"
        ? number(values[name])
        : String(values[name] ?? `{${name}}`),
    );
  const date = (value: string | Date, long = false) =>
    new Intl.DateTimeFormat(intlLocale, {
      day: "numeric",
      month: long ? "long" : "short",
      year: "numeric",
      timeZone: "Asia/Riyadh",
    }).format(new Date(value));
  const relativeTime = (value: number, unit: Intl.RelativeTimeFormatUnit) =>
    new Intl.RelativeTimeFormat(intlLocale, { numeric: "auto" }).format(
      value,
      unit,
    );
  const reportCount = (count: number) => {
    const category = new Intl.PluralRules(intlLocale).select(count);
    return t(`reports.${category}`, { count });
  };
  const college = (name: string) => {
    const key = collegeKeys.find((key) => en[key] === name || ar[key] === name);
    return key ? t(key) : name;
  };
  const translateMessage = (message: string) => {
    const key = (Object.keys(en) as MessageKey[]).find(
      (key) => en[key] === message || ar[key] === message,
    );
    return key ? t(key) : message;
  };
  const errorText = (
    error: unknown,
    fallback: MessageKey = "errors.generic",
  ) => {
    if (error instanceof ApiError) {
      const known = (Object.keys(en) as MessageKey[]).find(
        (key) =>
          key.startsWith("errors.") &&
          (en[key] === error.message || ar[key] === error.message),
      );
      if (known) return t(known);
      const statuses: Record<number, MessageKey> = {
        400: "errors.validation",
        401: "errors.session",
        403: "errors.forbidden",
        404: "errors.postNotFound",
        409: "errors.conflict",
        429: "errors.rateLimit",
      };
      return t(statuses[error.status] ?? fallback);
    }
    return t(fallback);
  };
  return {
    locale,
    dir: locale === "ar" ? ("rtl" as const) : ("ltr" as const),
    t,
    number,
    date,
    relativeTime,
    reportCount,
    college,
    translateMessage,
    errorText,
  };
}
export type I18n = ReturnType<typeof createI18n>;
