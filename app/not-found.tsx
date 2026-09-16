"use client";
import EmptyState from "@/components/EmptyState";
import { useI18n } from "@/context/LocaleContext";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md">
        <EmptyState
          icon={AlertCircle}
          title={t("errors.notFound")}
          description={t("errors.notFoundDescription")}
          action={
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active h-9 gap-1.5 px-2.5 text-sm font-medium whitespace-nowrap transition-all"
            >
              {t("errors.home")}
            </Link>
          }
        />
      </div>
    </div>
  );
}
