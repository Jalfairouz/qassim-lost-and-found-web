"use client";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/LocaleContext";
import { deletePost, getMyPosts } from "@/lib/api";
import { Post } from "@/types";
import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPostsPage() {
  const { t, date, college, errorText } = useI18n();

  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user || !token) return;

    getMyPosts(token)
      .then(setPosts)
      .catch(() => setError(t("errors.mine")))
      .finally(() => setLoading(false));
  }, [user, token, t]);

  async function handleDelete(id: number) {
    if (!token) return;

    setDeleting(true);
    try {
      await deletePost(id, token);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError(errorText(err, "errors.delete"));
    } finally {
      setDeleting(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <PageHeader title={t("nav.mine")} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoadingState type="card" count={3} />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <PageHeader
        title={t("nav.mine")}
        description={t("mine.description")}
        action={
          <Link
            href="/posts/new"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active h-9 gap-1.5 px-2.5 text-sm font-medium whitespace-nowrap transition-all"
          >
            <Plus className="me-2 h-4 w-4" />
            {t("mine.new")}
          </Link>
        }
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && <ErrorState message={error} />}

        {!error && posts.length === 0 && (
          <EmptyState
            icon={Plus}
            title={t("mine.empty")}
            description={t("mine.emptyDescription")}
            action={
              <Link
                href="/posts/new"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active h-9 gap-1.5 px-2.5 text-sm font-medium whitespace-nowrap transition-all"
              >
                {t("nav.report")}
              </Link>
            }
          />
        )}

        {posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <StatusBadge type={post.type} size="sm" />
                      <span className="text-xs text-muted-foreground">
                        {date(post.createdAt)}
                      </span>
                    </div>
                    <Link
                      href={`/posts/${post.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors truncate block mb-1"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {college(post.collegeName)}
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="inline-flex items-center justify-center rounded-lg border-border bg-background text-foreground hover:bg-muted h-9 gap-1 px-2.5 text-xs font-medium whitespace-nowrap transition-all border"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="ms-2">{t("common.edit")}</span>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setDeletingId(post.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline ms-2">
                        {t("common.delete")}
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        title={t("dialog.delete")}
        description={t("dialog.deleteDescription")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        isDestructive
        isLoading={deleting}
        onConfirm={() => deletingId && handleDelete(deletingId)}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setDeletingId(null);
        }}
      />
    </>
  );
}
