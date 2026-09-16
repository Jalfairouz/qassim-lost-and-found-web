"use client";
import { useI18n } from "@/context/LocaleContext";
export default function Spinner() {
  const { t } = useI18n();
  return (
    <div
      role="status"
      aria-label={t("common.loading")}
      className="flex justify-center py-12"
    >
      <div
        aria-hidden
        className="size-6 rounded-full border-2 border-border border-t-primary animate-spin"
      />
    </div>
  );
}
