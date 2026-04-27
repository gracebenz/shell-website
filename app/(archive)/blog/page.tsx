import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import PerPageSetter from "@/components/PerPageSetter";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; perPage?: string }>;
}) {
  const { q = "", page: rawPage, perPage: rawPerPage } = await searchParams;
  const PER_PAGE = Math.max(3, parseInt(rawPerPage ?? "6", 10));
  const page = Math.max(1, parseInt(rawPage ?? "1", 10));
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE - 1;

  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("slug, title, excerpt, published_at", { count: "exact" })
    .order("published_at", { ascending: false });
  if (q) query = query.ilike("title", `%${q}%`);
  query = query.range(start, end);

  const { data: posts, count } = await query;
  const totalPages = Math.ceil((count ?? 0) / PER_PAGE);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    if (rawPerPage) params.set("perPage", rawPerPage);
    const s = params.toString();
    return `/blog${s ? `?${s}` : ""}`;
  }

  const Pagination = () => totalPages > 1 ? (
    <div className="pagination">
      {page > 1 ? (
        <Link href={pageUrl(page - 1)} className="page-link">← Prev</Link>
      ) : (
        <span className="page-link dim">← Prev</span>
      )}
      <span className="page-count">
        {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </span>
      {page < totalPages ? (
        <Link href={pageUrl(page + 1)} className="page-link">Next →</Link>
      ) : (
        <span className="page-link dim">Next →</span>
      )}
    </div>
  ) : null;

  return (
    <div className="archive-wrap">
      <PerPageSetter scrollId="blog-scroll" cardsId="blog-cards" gapH={0} maxCols={1} />

      <div id="blog-scroll" className="archive-scroll">

        <Link href="/#blog" className="back-link">← Back</Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h1 className="archive-heading">Journal</h1>
          <form method="GET" action="/blog" style={{ display: "flex", alignItems: "center", paddingBottom: "0.75rem" }}>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search entries..."
              className="search-field"
            />
          </form>
        </div>

        <div style={{ height: "1px", background: "rgba(184,150,46,0.2)", marginBottom: "2.5rem" }} />

        {!posts?.length ? (
          <p style={{ fontFamily: "Klomisk, sans-serif", fontSize: "var(--text-md)", color: "var(--color-dim)" }}>
            {q ? `No entries matching "${q}".` : "No entries yet."}
          </p>
        ) : (
          <div className="journal-list" id="blog-cards" style={{ borderTop: "1px solid rgba(240,232,216,0.06)" }}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="journal-entry">
                <div>
                  <span className="journal-marker">✦</span>
                  <span className="journal-title">{post.title}</span>
                  {post.excerpt && <p className="journal-excerpt">{post.excerpt}</p>}
                </div>
                <span className="journal-date">{formatDate(post.published_at)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && <Pagination />}

      <footer className="site-footer">
        <span className="footer-copy">© Shell Tu</span>
        <span className="footer-ornament">✦</span>
        <span className="footer-copy">A Glass or Tu</span>
      </footer>
    </div>
  );
}
