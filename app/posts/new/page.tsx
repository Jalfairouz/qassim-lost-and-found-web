"use client";
import LoadingState from "@/components/LoadingState";
import PostForm from "@/components/PostForm";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/LocaleContext";
import { createPost } from "@/lib/api";
import { CreatePostInput } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewPostPage() {
  const { t } = useI18n();

  const router = useRouter();
  const { user, token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <LoadingState type="card" count={1} />
      </div>
    );
  }

  async function handleCreate(values: CreatePostInput) {
    const created = await createPost(values, token!);
    router.push(`/posts/${created.id}`);
  }

  return (
    <>
      <div className="border-b border-border bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("nav.report")}
          </h1>
          <p className="text-muted-foreground">{t("form.newDescription")}</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PostForm onSubmit={handleCreate} submitLabel={t("form.create")} />
      </div>
    </>
  );
}
