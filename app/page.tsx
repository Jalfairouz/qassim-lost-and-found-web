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
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/lost"
            className="inline-flex items-center justify-center rounded-2xl border-1 border-red-100
                      bg-white px-6 py-3 text-sm font-semibold text-[#14304d]
                      shadow-md shadow-red-500/20 transition-all duration-200
                      hover:-translate-y-0.5 hover:border-red-900 hover:bg-red-20
                      hover:shadow-lg hover:shadow-red-800/30
                      focus:outline-none focus:ring-2 focus:ring-red-500/30"
          >
            Report Lost Item
          </Link>

          <Link
            href="/found"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-green-100
                      bg-white px-6 py-3 text-sm font-semibold text-[#14304d]
                      shadow-md shadow-green-500/20 transition-all duration-200
                      hover:-translate-y-0.5 hover:border-green-900 hover:bg-green-20
                      hover:shadow-lg hover:shadow-green-800/30
                      focus:outline-none focus:ring-2 focus:ring-green-500/30"
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