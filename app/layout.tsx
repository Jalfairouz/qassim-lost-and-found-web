import AppHeader from "@/components/AppHeader";
import { AuthProvider } from "@/context/AuthContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { getI18n } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t("brand.name"), description: t("brand.description") };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, dir, t } = await getI18n();
  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(inter.variable, tajawal.variable, "font-sans")}
    >
      <body className="min-h-screen antialiased bg-background">
        <LocaleProvider locale={locale}>
          <AuthProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3"
            >
              {t("common.skip")}
            </a>
            <AppHeader />
            <main
              id="main-content"
              tabIndex={-1}
              className="min-h-[calc(100svh-5rem)] bg-background"
            >
              {children}
            </main>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
