import Link from "next/link";
import { getPosts } from "@/lib/api";
import PostGrid from "@/components/PostGrid";

export default async function Home() {
  const recentPosts = await getPosts();
  const recent = recentPosts.slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Qassim University Lost & Found
        </h1>
        <p className="text-gray-600 mb-6">
          Search for lost items or help return found items to their owners.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/lost"
            className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
          >
            Report Lost Item
          </Link>
          <Link
            href="/found"
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
          >
            Report Found Item
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Posts
        </h2>
        <PostGrid posts={recent} />
      </section>
    </main>
  );
}