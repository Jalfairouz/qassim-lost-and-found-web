import PageContainer from "@/components/PageContainer";
import StatusBadge from "@/components/StatusBadge";
import { ApiError, getPostById } from "@/lib/api";
import { getI18n } from "@/lib/i18n/server";
import { ArrowLeft, CalendarDays, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { t, date, college } = await getI18n();

  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    notFound();
  }

  let post;
  try {
    post = await getPostById(postId);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const formattedDate = date(post.createdAt, true);

  return (
    <PageContainer className="py-8 sm:py-12">
      <Link
        href={post.type === "Lost" ? "/lost" : "/found"}
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
      >
        <ArrowLeft aria-hidden className="rtl:-scale-x-100 size-4" />
        {t(post.type === "Lost" ? "report.backLost" : "report.backFound")}
      </Link>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="border-b bg-secondary/40 p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <StatusBadge type={post.type} />
              <span className="text-xs text-muted-foreground">
                {t("report.number", { id: post.id })}
              </span>
            </div>
            <h1
              dir="auto"
              className="break-words text-3xl font-bold sm:text-4xl"
            >
              {post.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin aria-hidden className="size-4 shrink-0" />
              {college(post.collegeName)}
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-semibold">{t("report.about")}</h2>
            <p
              dir="auto"
              className="whitespace-pre-wrap break-words leading-8 text-muted-foreground"
            >
              {post.description}
            </p>
            <div className="mt-8 border-t pt-5 text-sm text-muted-foreground">
              <CalendarDays aria-hidden className="me-2 inline size-4" />
              {t("report.reported")}{" "}
              <time dateTime={post.createdAt}>{formattedDate}</time>
            </div>
          </div>
        </article>
        <aside className="space-y-5">
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <span className="mb-4 inline-flex rounded-xl bg-teal-soft p-3 text-teal">
              <Phone aria-hidden className="size-5" />
            </span>
            <h2 className="text-xl font-semibold">
              {post.type === "Lost" ? t("report.seen") : t("report.yours")}
            </h2>
            <p className="my-3 text-sm text-muted-foreground">
              {t("report.contact")}
            </p>
            <a
              href={`tel:$<bdi dir="ltr">{post.contactNumber}</bdi>`}
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-white"
            >
              <Phone aria-hidden className="size-4" />
              {t("report.call")}
              {post.contactNumber}
            </a>
          </section>
          <section className="rounded-2xl border border-teal/20 bg-teal-soft p-6 text-teal">
            <h2 className="font-semibold">{t("report.handover")}</h2>
            <p className="mt-2 text-sm">{t("report.handoverDescription")}</p>
          </section>
        </aside>
      </div>
    </PageContainer>
  );
}
