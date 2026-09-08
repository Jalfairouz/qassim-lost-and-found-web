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
    <nav className="border-b border-gray-100 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-900">
          Qassim Lost & Found
        </Link>
        <div className="flex gap-4 text-sm items-center">
          <Link href="/lost" className="text-gray-600 hover:text-gray-900">
            Lost Items
          </Link>
          <Link href="/found" className="text-gray-600 hover:text-gray-900">
            Found Items
          </Link>

          {!loading && !user && (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link href="/my-posts" className="text-gray-600 hover:text-gray-900">
                My Posts
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
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