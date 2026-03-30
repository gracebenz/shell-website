import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import PerPageSetter from "@/components/PerPageSetter";
import WavyRule from "@/components/WavyRule";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
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
    <div className="flex items-center justify-center gap-6">
      {page > 1 ? (
        <Link href={pageUrl(page - 1)} className="text-xs uppercase tracking-widest transition-colors hover:text-accent" style={{ color: "#2d0719" }}>
          ← Prev
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.3)" }}>← Prev</span>
      )}
      <span className="text-xs" style={{ color: "#6f4951" }}>
        {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
      </span>
      {page < totalPages ? (
        <Link href={pageUrl(page + 1)} className="text-xs uppercase tracking-widest transition-colors hover:text-accent" style={{ color: "#2d0719" }}>
          Next →
        </Link>
      ) : (
        <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.3)" }}>Next →</span>
      )}
    </div>
  ) : null;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: "#d9e6f1" }}>
      <PerPageSetter scrollId="blog-scroll" cardsId="blog-cards" gapH={8} maxCols={1} />

      {/* Scrollable content */}
      <div id="blog-scroll" className="flex-1 overflow-y-auto no-scrollbar px-6 md:px-16 py-6 max-w-3xl mx-auto w-full">

        {/* Back button */}
        <Link href="/#blog" className="inline-flex items-center gap-1 text-xs uppercase tracking-widest transition-colors hover:text-accent mb-4" style={{ color: "#6f4951" }}>
          ← Back
        </Link>

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <h1
            className="text-5xl md:text-6xl uppercase leading-none"
            style={{ fontFamily: "ZT Yaglo, sans-serif", fontWeight: 100, color: "#2d0719", letterSpacing: "0.1em" }}
          >
            Blog
          </h1>
          <div className="w-12 mt-3" style={{ height: "1px", backgroundColor: "#f0494e" }} />
          <form method="GET" action="/blog" className="flex items-center">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search posts..."
              className="text-sm outline-none"
              style={{
                backgroundColor: "#faf7f4",
                border: "1.5px solid rgba(45,7,25,0.2)",
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                color: "#2d0719",
                width: "min(100%, 280px)",
              }}
            />
          </form>
        </div>

        {/* Post list */}
        {!posts?.length ? (
          <p className="text-sm" style={{ color: "#6f4951" }}>
            {q ? `No posts matching "${q}".` : "No posts yet."}
          </p>
        ) : (
          <div id="blog-cards" className="flex flex-col gap-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1.5 rounded-xl p-4 transition-all duration-300 hover:scale-[1.01]"
                style={{ backgroundColor: "#faf7f4", border: "1px solid rgba(45,7,25,0.06)" }}
              >
                <p className="text-[11px] uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.5)" }}>
                  {formatDate(post.published_at)}
                </p>
                <h2 className="text-2xl leading-snug" style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#6f4951" }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(45,7,25,0.6)" }}>
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pinned bottom: pagination + footer */}
      {totalPages > 1 && (
        <div className="py-3 flex justify-center">
          <Pagination />
        </div>
      )}
      <div className="py-6 flex flex-col items-center gap-3">
        <WavyRule />
        <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(45,7,25,0.4)" }}>© Shell Tu</p>
      </div>
    </div>
  );
}
