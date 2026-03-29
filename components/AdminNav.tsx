import Link from "next/link";
import { logout } from "@/app/actions/logout";

export default function AdminNav() {
  return (
    <header className="px-6 md:px-12 py-4 flex items-center gap-8 border-b bg-heading text-canvas">
      <Link href="/admin" className="font-serif text-lg font-bold tracking-tight">
        Shell · Admin
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link href="/admin/events" className="opacity-80 hover:opacity-100 transition-opacity">
          Events
        </Link>
        <Link href="/admin/blog" className="opacity-80 hover:opacity-100 transition-opacity">
          Blog
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-6">
        <Link
          href="/"
          className="text-xs opacity-60 hover:opacity-100 transition-opacity tracking-wide"
        >
          ← View site
        </Link>
        <form action={logout} className="flex items-center">
          <button
            type="submit"
            className="text-xs opacity-60 hover:opacity-100 transition-opacity tracking-wide"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
