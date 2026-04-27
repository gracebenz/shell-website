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
    <div style={{ maxWidth: "52rem" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <div>
          <h1 className="admin-heading">Journal</h1>
          <div className="admin-rule" />
        </div>
        <Link href="/admin/blog/new" className="admin-btn-primary">+ New entry</Link>
      </div>

      {!posts?.length ? (
        <p className="admin-empty">No entries yet.</p>
      ) : (
        <div className="admin-table">
          {posts.map((post) => (
            <div key={post.slug} className="admin-row">
              <div>
                <div className="admin-row-title">{post.title}</div>
                <div className="admin-row-meta">{formatDate(post.published_at)}</div>
              </div>
              <div className="admin-actions">
                <Link href={`/admin/blog/${post.slug}`} className="admin-btn-ghost">Edit</Link>
                <DeletePostButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
