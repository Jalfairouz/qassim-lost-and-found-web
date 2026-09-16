"use client";
import { useI18n } from "@/context/LocaleContext";
import { College, PostType } from "@/types";
import { Search } from "lucide-react";
export default function SearchPanel({
  colleges,
  action = "/",
  search = "",
  collegeId = "",
  type,
}: {
  colleges: College[];
  action?: string;
  search?: string;
  collegeId?: string;
  type?: PostType;
}) {
  const { t, college } = useI18n();

  return (
    <form
      key={`${search}:${collegeId}`}
      action={action}
      role={"search"}
      className="grid gap-4 rounded-2xl border bg-card p-5 text-foreground shadow-sm sm:grid-cols-[1fr_1fr_auto]"
    >
      {type && <input type="hidden" name={"type"} value={type} />}
      <div>
        <label
          htmlFor="report-search"
          className="mb-1.5 block text-xs font-semibold"
        >
          {t("search.prompt")}
        </label>
        <input
          id="report-search"
          name={"search"}
          defaultValue={search}
          placeholder={t("search.placeholder")}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="report-college"
          className="mb-1.5 block text-xs font-semibold"
        >
          {t("search.location")}
        </label>
        <select
          id="report-college"
          name="collegeId"
          defaultValue={collegeId}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm"
        >
          <option value="">{t("search.allColleges")}</option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>
              {college(c.name)}
            </option>
          ))}
        </select>
      </div>
      <button className="inline-flex h-11 items-center justify-center gap-2 self-end rounded-lg bg-primary px-6 text-sm font-semibold text-white">
        <Search aria-hidden className="size-4" />
        {t("common.search")}
      </button>
    </form>
  );
}
