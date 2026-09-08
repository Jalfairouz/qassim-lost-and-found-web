import { getPosts } from "@/lib/api";
import PostGrid from "@/components/PostGrid";

export default async function FoundPage() {
  const posts = await getPosts({ type: "Found" });

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Found Items</h1>
      <PostGrid posts={posts} />
    </main>
  );
}