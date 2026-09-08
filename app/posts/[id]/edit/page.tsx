"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getPostById, updatePost, ApiError } from "@/lib/api";
import PostForm from "@/components/PostForm";
import { CreatePostInput, Post } from "@/types";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [postId, setPostId] = useState<number | null>(null);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    params.then(({ id }) => {
      const numId = Number(id);
      setPostId(numId);
      getPostById(numId).then(setPost).catch(() => setNotAllowed(true));
    });
  }, [params]);

  if (loading || !user || postId === null) {
    return <main className="max-w-lg mx-auto px-4 py-16">Loading...</main>;
  }

  if (notAllowed || !post) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16">
        <p className="text-red-600">Post not found.</p>
      </main>
    );
  }

  if (post.userId !== user.sub) {
    return (
      <main className="max-w-lg mx-auto px-4 py-16">
        <p className="text-red-600">You can only edit your own posts.</p>
      </main>
    );
  }

  const initialValues: CreatePostInput = {
    title: post.title,
    description: post.description,
    type: post.type,
      collegeId: post.collegeId,   // <-- changed from 0
    contactNumber: post.contactNumber,
  };

  async function handleUpdate(values: CreatePostInput) {
    try {
      await updatePost(postId!, values, token!);
      router.push(`/posts/${postId}`);
    } catch (err) {
      throw err instanceof ApiError ? err : new Error("Update failed.");
    }
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </main>
  );
}