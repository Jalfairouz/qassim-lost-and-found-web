import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-900">
          Qassim Lost & Found
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/lost" className="text-gray-600 hover:text-gray-900">
            Lost Items
          </Link>
          <Link href="/found" className="text-gray-600 hover:text-gray-900">
            Found Items
          </Link>
          {/* Login/Register/My Posts links added in Step 11.3 */}
        </div>
      </div>
    </nav>
  );
}