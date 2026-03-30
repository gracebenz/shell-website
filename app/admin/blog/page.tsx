import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import DeletePostButton from "@/components/DeletePostButton";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, published_at")
    .order("published_at", { ascending: false });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-heading">Blog Posts</h1>
          <div style={{ width: "32px", height: "1px", backgroundColor: "#f0494e", marginTop: "6px" }} />
        </div>
        <Link href="/admin/blog/new"
          className="px-4 py-2 bg-heading text-canvas text-sm font-medium rounded-lg hover:opacity-80 transition-opacity">
          + New post
        </Link>
      </div>

      {!posts?.length ? (
        <p className="text-ink/30 text-sm">No posts yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-rim/30">
          {posts.map((post) => (
            <div key={post.slug} className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-ink">{post.title}</p>
                <p className="text-xs text-ink/50 mt-0.5">{formatDate(post.published_at)}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/blog/${post.slug}`} className="text-xs text-accent hover:underline">
                  Edit
                </Link>
                <DeletePostButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
