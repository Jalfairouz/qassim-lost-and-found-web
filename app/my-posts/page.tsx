"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getMyPosts, deletePost, ApiError } from "@/lib/api";
import { Post } from "@/types";

export default function MyPostsPage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !token) return;

    getMyPosts(token)
      .then(setPosts)
      .catch(() => setError("Failed to load your posts."))
      .finally(() => setFetching(false));
  }, [user, token]);

  async function handleDelete(id: number) {
    if (!token) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await deletePost(id, token);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading || !user) {
    return <main className="max-w-3xl mx-auto px-4 py-16">Loading...</main>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Posts</h1>
        <Link
          href="/posts/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          + New Post
        </Link>
      </div>

      {fetching && <p className="text-gray-500">Loading your posts...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!fetching && !error && posts.length === 0 && (
        <p className="text-gray-500">
          You haven't posted anything yet.{" "}
          <Link href="/posts/new" className="underline">
            Report your first item
          </Link>
          .
        </p>
      )}

      <div className="space-y-3">
        {posts.map((post) => {
          const isLost = post.type === "Lost";
          return (
            <div
              key={post.id}
              className="border border-gray-100 shadow-sm rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      isLost
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isLost ? "Lost" : "Found"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  href={`/posts/${post.id}`}
                  className="font-medium text-gray-900 hover:underline truncate block"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500">{post.collegeName}</p>
              </div>

              <div className="flex gap-2 ml-4 shrink-0">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === post.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}