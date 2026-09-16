"use client";
import { useI18n } from "@/context/LocaleContext";
import { PostType } from "@/types";
import Link from "next/link";
export default function FilterBar({
  type,
  search = "",
  collegeId = "",
  count,
}: {
  type?: PostType;
  search?: string;
  collegeId?: string;
  count: number;
}) {
  const { t, reportCount } = useI18n();

  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (collegeId) query.set("collegeId", collegeId);
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <nav
        aria-label={t("search.filters")}
        className="flex rounded-xl border bg-card p-1"
      >
        {[
          { label: t("search.allReports"), path: "/", type: undefined },
          { label: t("report.lost"), path: "/lost", type: "Lost" },
          { label: t("report.found"), path: "/found", type: "Found" },
        ].map((item) => (
          <Link
            key={item.path}
            href={item.path + (query.size ? "?" + query : "")}
            aria-current={type === item.type ? "page" : undefined}
            className={
              "rounded-lg px-4 py-2 text-sm font-medium " +
              (type === item.type
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted")
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <p className="text-sm text-muted-foreground">
        {reportCount(count)}
        {(search || collegeId) && (
          <>
            {" "}
            ·{" "}
            <Link
              className="underline"
              href={
                type === "Lost" ? "/lost" : type === "Found" ? "/found" : "/"
              }
            >
              {t("search.clear")}
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
