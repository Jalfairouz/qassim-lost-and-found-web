"use client";
import EmptyState from "@/components/EmptyState";
import { useI18n } from "@/context/LocaleContext";
import { Post } from "@/types";
import { Search } from "lucide-react";
import PostCard from "./PostCard";

export default function PostGrid({ posts }: { posts: Post[] }) {
  const { t } = useI18n();

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title={t("empty.title")}
        description={t("empty.description")}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
