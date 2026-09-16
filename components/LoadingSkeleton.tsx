"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/context/LocaleContext";
export default function LoadingSkeleton({ count = 6 }: { count?: number }) {
  const { t } = useI18n();

  return (
    <div role="status" aria-label={t("common.loading")}>
      <span className="sr-only">{t("common.loadingText")}</span>
      <div aria-hidden className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="space-y-5 rounded-2xl border bg-card p-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
