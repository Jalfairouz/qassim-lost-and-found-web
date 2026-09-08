"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, isAdmin, logout, loading } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }
return (
  <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link href="/" className="font-light text-lg text-[#14304d]">
        مفقودات جامعة القصيم
      </Link>
      <div className="flex gap-4 text-sm items-center">
        <Link href="/lost" className="text-gray-600 hover:text-[#051339] transition-colors">
          Lost Items
        </Link>
        <Link href="/found" className="text-gray-600 hover:text-[#051339] transition-colors">
          Found Items
        </Link>

        {!loading && !user && (
          <>
            <Link href="/login" className="text-gray-600 hover:text-[#051339] transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-[#1d4ed8] text-white px-3 py-1.5 rounded-lg hover:bg-[#051339] transition-colors"
            >
              Register
            </Link>
          </>
        )}

        {!loading && user && (
          <>
            <Link href="/my-posts" className="text-gray-600 hover:text-[#051339] transition-colors">
              My Posts
            </Link>
            {isAdmin && (
              <Link href="/admin" className="text-gray-600 hover:text-[#051339] transition-colors">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-[#051339] transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);
}