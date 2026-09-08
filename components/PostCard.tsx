import Link from "next/link";
import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  const isLost = post.type === "Lost";

  return (
    <Link
      href={`/posts/${post.id}`}
      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex items-center justify-between mb-2">
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

      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
        {post.description}
      </p>
      <p className="text-xs text-gray-500">{post.collegeName}</p>
    </Link>
  );
}