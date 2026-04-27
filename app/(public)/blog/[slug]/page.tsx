import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  const paragraphs: string[] = post.body.split("\n\n");

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <BackButton fallback="/#blog" className="back-link" />

        {/* Date */}
        <p style={{
          fontFamily: "Klomisk, sans-serif",
          fontSize: "var(--text-sm)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
          marginBottom: "1.5rem",
        }}>
          {formatDate(post.published_at)}
        </p>

        {/* Title */}
        <h1 className="detail-heading">{post.title}</h1>

        <div className="detail-rule" />

        {/* Body with drop-cap on first paragraph */}
        <div className="detail-body">
          {paragraphs.map((para: string, i: number) => (
            <p
              key={i}
              style={i === 0 ? {
                "--drop-cap-family": "Thegralke, Georgia, serif",
              } as React.CSSProperties : undefined}
              className={i === 0 ? "drop-cap-para" : undefined}
            >
              {para}
            </p>
          ))}
        </div>

        <div className="detail-ornament">✦</div>
      </div>
    </div>
  );
}
