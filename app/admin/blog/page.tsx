import Link from "next/link";

export default function AdminBlogPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold text-midnight-violet">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-deep-crimson text-cream text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          + New post
        </Link>
      </div>
      <div className="text-ink/30 text-sm">Posts will appear here.</div>
    </div>
  );
}
