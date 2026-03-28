import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold text-midnight-violet mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/events"
          className="p-6 rounded-xl border border-lilac-ash/40 hover:border-deep-crimson/40 transition-colors"
        >
          <h2 className="font-serif text-lg font-bold text-midnight-violet mb-1">Events</h2>
          <p className="text-sm text-ink/50">Manage, add, and edit events.</p>
        </Link>
        <Link
          href="/admin/blog"
          className="p-6 rounded-xl border border-lilac-ash/40 hover:border-deep-crimson/40 transition-colors"
        >
          <h2 className="font-serif text-lg font-bold text-midnight-violet mb-1">Blog</h2>
          <p className="text-sm text-ink/50">Write and publish posts.</p>
        </Link>
      </div>
    </div>
  );
}
