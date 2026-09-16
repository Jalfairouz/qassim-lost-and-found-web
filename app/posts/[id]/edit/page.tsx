"use client";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import PostForm from "@/components/PostForm";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/LocaleContext";
import { ApiError, getPostById, updatePost } from "@/lib/api";
import { CreatePostInput, Post } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { t } = useI18n();

  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    params.then(({ id }) => {
      const numId = Number(id);
      if (Number.isNaN(numId)) {
        setError(t("errors.invalidId"));
        setLoading(false);
        return;
      }
      setPostId(numId);
      getPostById(numId)
        .then(setPost)
        .catch(() => setError(t("errors.postNotFound")))
        .finally(() => setLoading(false));
    });
  }, [params, t]);

  if (authLoading || loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <LoadingState type="card" count={1} />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <ErrorState message={error || t("errors.postNotFound")} />
      </div>
    );
  }

  if (!user || post.userId !== user.sub) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <ErrorState
          title={t("errors.unauthorized")}
          message={t("errors.ownerOnly")}
        />
      </div>
    );
  }

  const initialValues: CreatePostInput = {
    title: post.title,
    description: post.description,
    type: post.type,
    collegeId: post.collegeId,
    contactNumber: post.contactNumber,
  };

  async function handleUpdate(values: CreatePostInput) {
    try {
      await updatePost(postId!, values, token!);
      router.push(`/posts/${postId}`);
    } catch (err) {
      throw err instanceof ApiError ? err : new Error(t("errors.update"));
    }
  }

  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("form.edit")}
          </h1>
          <p className="text-muted-foreground">{t("form.editDescription")}</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PostForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          submitLabel={t("common.save")}
        />
      </div>
    </>
  );
}
