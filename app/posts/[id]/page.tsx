import { notFound } from "next/navigation";
import { getPostById, ApiError } from "@/lib/api";

export default async function PostDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    notFound();
  }

  let post;
  try {
    post = await getPostById(postId);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  const isLost = post.type === "Lost";

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="border border-gray-100 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              isLost ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {isLost ? "Lost" : "Found"}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 mb-4">{post.collegeName}</p>

        <p className="text-gray-700 mb-6 whitespace-pre-line">
          {post.description}
        </p>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500 mb-1">Contact Number</p>
          <a
            href={`tel:${post.contactNumber}`}
            className="text-lg font-semibold text-gray-900 hover:underline"
          >
            {post.contactNumber}
          </a>
        </div>
      </div>
    </main>
  );
}