"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/context/LocaleContext";

interface LoadingStateProps {
  type?: "card" | "list" | "grid";
  count?: number;
}

export default function LoadingState({
  type = "card",
  count = 3,
}: LoadingStateProps) {
  const { t } = useI18n();
  if (type === "card") {
    return (
      <div role="status" aria-label={t("common.loading")} className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 p-4 border border-border rounded-lg"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "grid") {
    return (
      <div
        role="status"
        aria-label={t("common.loading")}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div role="status" aria-label={t("common.loading")} className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
