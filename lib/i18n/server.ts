import { cookies } from "next/headers";
import { createI18n, defaultLocale, isLocale, localeCookie } from "./index";

export async function getI18n() {
  const value = (await cookies()).get(localeCookie)?.value;
  return createI18n(isLocale(value) ? value : defaultLocale);
}
