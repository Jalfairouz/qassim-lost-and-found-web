"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createPost } from "@/lib/api";
import PostForm from "@/components/PostForm";
import { CreatePostInput } from "@/types";

export default function NewPostPage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <main className="max-w-lg mx-auto px-4 py-16">Loading...</main>;
  }

  async function handleCreate(values: CreatePostInput) {
    const created = await createPost(values, token!);
    router.push(`/posts/${created.id}`);
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Report an Item</h1>
      <PostForm onSubmit={handleCreate} submitLabel="Create Post" />
    </main>
  );
}