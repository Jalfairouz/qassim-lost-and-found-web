"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/LocaleContext";
import { Compass, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import PageContainer from "./PageContainer";
export default function AppHeader() {
  const { t, locale, dir, setLocale, pending } = useI18n();

  const { user, isAdmin, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/", label: t("nav.overview") },
    { href: "/lost", label: t("nav.lost") },
    { href: "/found", label: t("nav.found") },
    ...(user ? [{ href: "/my-posts", label: t("nav.mine") }] : []),
    ...(isAdmin ? [{ href: "/admin", label: t("nav.admin") }] : []),
  ];
  const navigation = links.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      onClick={() => setOpen(false)}
      className={
        "rounded-lg px-3 py-2 text-sm font-medium " +
        (pathname === item.href
          ? "bg-secondary text-primary"
          : "text-muted-foreground hover:bg-muted")
      }
    >
      {item.label}
    </Link>
  ));
  const account =
    !loading &&
    (user ? (
      <Button
        variant="ghost"
        onPress={() => {
          logout();
          setOpen(false);
          router.push("/");
        }}
      >
        {t("nav.logout")}
      </Button>
    ) : (
      <>
        <Link
          href="/login"
          onClick={() => setOpen(false)}
          className="px-3 py-2 text-sm font-medium"
        >
          {t("nav.login")}
        </Link>
        <Link
          href="/register"
          onClick={() => setOpen(false)}
          className="px-3 py-2 text-sm font-medium"
        >
          {t("nav.register")}
        </Link>
      </>
    ));
  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
      <PageContainer>
        <div className="flex h-20 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="rounded-xl bg-primary p-2.5 text-white">
              <Compass aria-hidden className="size-6" />
            </span>
            <span className="text-sm sm:text-base font-bold leading-tight">
              {t("brand.short")}
              <span className="block text-xs font-normal text-muted-foreground">
                {t("brand.service")}
              </span>
            </span>
          </Link>
          <nav
            aria-label={t("nav.main")}
            className="hidden items-center gap-1 xl:flex"
          >
            {navigation}
          </nav>
          <div className="hidden items-center gap-1 xl:flex">
            {account}
            <Link
              href="/posts/new"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Plus aria-hidden className="size-4" />
              {t("nav.report")}
            </Link>
          </div>
          <Button
            variant="outline"
            aria-label={t("nav.language")}
            isDisabled={pending}
            onPress={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="ms-auto shrink-0 px-3"
            lang={locale === "ar" ? "en" : "ar"}
          >
            {locale === "ar" ? t("nav.english") : t("nav.arabic")}
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={t("nav.open")}
            onPress={() => setOpen(true)}
            className="xl:hidden"
          >
            <Menu />
          </Button>
        </div>
      </PageContainer>
      <Sheet
        side={dir === "rtl" ? "left" : "right"}
        isOpen={open}
        onOpenChange={setOpen}
      >
        <SheetHeader>
          <SheetTitle>{t("brand.name")}</SheetTitle>
        </SheetHeader>
        <nav aria-label={t("nav.mobile")} className="flex flex-col gap-2 p-5">
          {navigation}
          <Link
            href="/posts/new"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-primary p-3 text-center text-white"
          >
            {t("nav.report")}
          </Link>
          {account}
        </nav>
      </Sheet>
    </header>
  );
}
