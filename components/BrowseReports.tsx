import { getColleges, getPosts } from "@/lib/api";
import { getI18n } from "@/lib/i18n/server";
import { PostType } from "@/types";
import Link from "next/link";
import FilterBar from "./FilterBar";
import PageContainer from "./PageContainer";
import PostGrid from "./PostGrid";
import SearchPanel from "./SearchPanel";
export type ReportSearchParams = Promise<{
  search?: string;
  collegeId?: string;
}>;
export default async function BrowseReports({
  type,
  searchParams,
}: {
  type: PostType;
  searchParams: ReportSearchParams;
}) {
  const { t } = await getI18n();

  const raw = await searchParams;
  const search = typeof raw.search === "string" ? raw.search : "";
  const collegeId = typeof raw.collegeId === "string" ? raw.collegeId : "";
  const [posts, colleges] = await Promise.all([
    getPosts({ type, search, collegeId: Number(collegeId) || undefined }),
    getColleges(),
  ]);
  posts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  return (
    <PageContainer className="py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal">
            {t("browse.community")}
          </p>
          <h1 className="text-3xl font-bold">
            {t(type === "Lost" ? "nav.lost" : "nav.found")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {type === "Lost"
              ? t("browse.lostDescription")
              : t("browse.foundDescription")}
          </p>
        </div>
        <Link
          href="/posts/new"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          {t("nav.report")}
        </Link>
      </div>
      <SearchPanel
        action={type === "Lost" ? "/lost" : "/found"}
        colleges={colleges}
        search={search}
        collegeId={collegeId}
      />
      <section className="mt-8" aria-label={t("search.reports")}>
        <FilterBar
          type={type}
          search={search}
          collegeId={collegeId}
          count={posts.length}
        />
        <PostGrid posts={posts} />
      </section>
    </PageContainer>
  );
}
