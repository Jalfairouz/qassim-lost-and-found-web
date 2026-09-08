"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getPosts, ApiError, request } from "@/lib/api";
import { Post } from "@/types";

interface AdminUser {
  id: string;
  email: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, token, isAdmin, loading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [tab, setTab] = useState<"posts" | "users">("posts");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [loading, user, isAdmin, router]);

  useEffect(() => {
    if (!user || !isAdmin || !token) return;

    Promise.all([
      getPosts(),
      request<AdminUser[]>("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ])
      .then(([allPosts, allUsers]) => {
        setPosts(allPosts);
        setUsers(allUsers);
      })
      .catch(() => setError("Failed to load admin data."))
      .finally(() => setFetching(false));
  }, [user, isAdmin, token]);

  async function handleDelete(id: number) {
    if (!token) return;
    if (!confirm("Delete this post as Admin? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await request<void>(`/admin/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading || !user || !isAdmin) {
    return <main className="max-w-4xl mx-auto px-4 py-16">Loading...</main>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#14304d] mb-6">Admin Dashboard</h1>

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setTab("posts")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            tab === "posts"
              ? "border-[#1d4ed8] text-[#1d4ed8]"
              : "border-transparent text-gray-500"
          }`}
        >
          All Posts ({posts.length})
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            tab === "users"
              ? "border-[#1d4ed8] text-[#1d4ed8]"
              : "border-transparent text-gray-500"
          }`}
        >
          Users ({users.length})
        </button>
      </div>

      {fetching && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!fetching && tab === "posts" && (
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
                  <p className="text-xs text-gray-500">
                    {post.collegeName} · Owner: {post.userId}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 ml-4 shrink-0"
                >
                  {deletingId === post.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {!fetching && tab === "users" && (
        <div className="border border-gray-100 shadow-sm rounded-lg divide-y divide-gray-100">
          {users.map((u) => (
            <div key={u.id} className="p-3 text-sm flex justify-between">
              <span className="text-gray-900">{u.email}</span>
              <span className="text-gray-400 text-xs">{u.id}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}