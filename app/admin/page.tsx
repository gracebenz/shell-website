import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-heading">Dashboard</h1>
        <div style={{ width: "32px", height: "1px", backgroundColor: "#f0494e", marginTop: "8px" }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/events"
          className="p-6 rounded-xl border border-ink/10 hover:border-accent/40 transition-colors"
          style={{ borderLeft: "2px solid #f0494e" }}
        >
          <h2 className="font-serif text-2xl font-bold text-heading mb-1">Events</h2>
          <p className="text-sm text-ink/50">Add, edit, and delete events.</p>
        </Link>
        <Link
          href="/admin/blog"
          className="p-6 rounded-xl border border-ink/10 hover:border-accent/40 transition-colors"
          style={{ borderLeft: "2px solid #f0494e" }}
        >
          <h2 className="font-serif text-2xl font-bold text-heading mb-1">Blog</h2>
          <p className="text-sm text-ink/50">Write, edit, and publish posts.</p>
        </Link>
      </div>
    </div>
  );
}
