"use client";
import { useI18n } from "@/context/LocaleContext";
import { Post } from "@/types";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import ReportTypeBadge from "./ReportTypeBadge";
export default function ReportCard({ post }: { post: Post }) {
  const { date, college } = useI18n();
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ring hover:shadow-md"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <ReportTypeBadge type={post.type} size="sm" />
        <time
          dateTime={post.createdAt}
          className="text-xs text-muted-foreground"
        >
          {date(post.createdAt)}
        </time>
      </div>
      <h3 dir="auto" className="mb-2 line-clamp-2 text-lg font-semibold">
        {post.title}
      </h3>
      <p
        dir="auto"
        className="mb-6 line-clamp-2 flex-1 text-sm text-muted-foreground"
      >
        {post.description}
      </p>
      <div className="flex items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5">
          <MapPin aria-hidden className="size-4 shrink-0" />
          <span className="truncate">{college(post.collegeName)}</span>
        </span>
        <ArrowUpRight
          aria-hidden
          className="rtl:-scale-x-100 size-4 shrink-0 text-primary"
        />
      </div>
    </Link>
  );
}
