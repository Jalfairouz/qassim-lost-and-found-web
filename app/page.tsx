import { ReportSearchParams } from "@/components/BrowseReports";
import FilterBar from "@/components/FilterBar";
import PageContainer from "@/components/PageContainer";
import PostGrid from "@/components/PostGrid";
import SearchPanel from "@/components/SearchPanel";
import StatCard from "@/components/StatCard";
import { getColleges, getPosts } from "@/lib/api";
import { getI18n } from "@/lib/i18n/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default async function Home({
  searchParams,
}: {
  searchParams: ReportSearchParams;
}) {
  const { t } = await getI18n();

  const raw = await searchParams;
  const search = typeof raw.search === "string" ? raw.search : "";
  const collegeId = typeof raw.collegeId === "string" ? raw.collegeId : "";
  const [all, colleges] = await Promise.all([getPosts(), getColleges()]);
  const filtered =
    search || collegeId
      ? await getPosts({ search, collegeId: Number(collegeId) || undefined })
      : all;
  const recent = [...filtered].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
  return (
    <PageContainer className="py-8 sm:py-10">
      <section className="relative overflow-hidden rounded-3xl bg-primary px-6 py-9 text-white sm:px-10">
        <div
          className="pointer-events-none absolute -end-16 -top-24 size-96 rounded-full border-[55px] border-white/5"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-hero-accent">
            {t("home.eyebrow")}
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            {t("home.title")}
            <br />
            <span className="text-hero-accent">{t("home.subtitle")}</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-primary-foreground/85 sm:text-base">
            {t("home.description")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/posts/new"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary"
            >
              {t("nav.report")}
            </Link>
            <Link
              href="/found"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold"
            >
              {t("home.browse")}
              <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
            </Link>
          </div>
        </div>
      </section>
      <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={t("stats.total")}
          value={all.length}
          icon="ClipboardList"
          description={t("stats.shared")}
        />
        <StatCard
          label={t("nav.lost")}
          value={all.filter((p) => p.type === "Lost").length}
          icon="Search"
          tone="orange"
          description={t("stats.lostHelp")}
        />
        <StatCard
          label={t("nav.found")}
          value={all.filter((p) => p.type === "Found").length}
          icon="HandHeart"
          tone="teal"
          description={t("stats.owners")}
        />
        <StatCard
          label={t("stats.colleges")}
          value={colleges.length}
          icon="MapPin"
          description={t("stats.campus")}
        />
      </div>
      <SearchPanel colleges={colleges} search={search} collegeId={collegeId} />
      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-2xl font-bold">
            {search || collegeId ? t("search.results") : t("home.latest")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home.kindness")}
          </p>
        </div>
        <FilterBar
          search={search}
          collegeId={collegeId}
          count={recent.length}
        />
        <PostGrid posts={search || collegeId ? recent : recent.slice(0, 6)} />
      </section>
      <aside className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-teal/20 bg-teal-soft p-6">
        <div>
          <h2 className="font-semibold text-teal">{t("home.foundTitle")}</h2>
          <p className="mt-1 text-sm text-teal">{t("home.foundDescription")}</p>
        </div>
        <Link
          href="/posts/new"
          className="inline-flex items-center gap-2 font-semibold text-teal"
        >
          {t("home.share")}
          <ArrowRight aria-hidden className="rtl:-scale-x-100 size-4" />
        </Link>
      </aside>
      <footer className="mt-10 text-center text-xs text-muted-foreground">
        {t("home.footer")}
      </footer>
    </PageContainer>
  );
}
