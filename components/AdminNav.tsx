import Link from "next/link";
import { logout } from "@/app/actions/logout";

export default function AdminNav() {
  return (
    <header className="admin-nav">
      <Link href="/admin" className="admin-brand">A Glass or Tu</Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/admin/events" className="admin-nav-link">Events</Link>
        <Link href="/admin/blog" className="admin-nav-link">Journal</Link>
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" className="admin-nav-link">← View site</Link>
        <form action={logout}>
          <button type="submit" className="admin-btn-ghost">Log out</button>
        </form>
      </div>
    </header>
  );
}
