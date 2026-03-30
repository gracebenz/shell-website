import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import BackButton from "@/components/BackButton";
import WavyRule from "@/components/WavyRule";

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

  return (
    <div className="flex-1 px-6 md:px-12 py-10" style={{ backgroundColor: "#2d0719" }}>
      <div className="max-w-2xl mx-auto rounded-3xl py-12 px-8 md:px-14" style={{ backgroundColor: "#d9e6f1" }}>
      <BackButton
        fallback="/#blog"
        className="inline-flex items-center gap-1 text-sm uppercase tracking-wide text-ink/70 hover:text-accent transition-colors mb-10 bg-transparent border-0 p-0 cursor-pointer"
      />

      <p className="text-[11px] uppercase tracking-widest mb-4" style={{ color: "rgba(45,7,25,0.6)" }}>
        {formatDate(post.published_at)}
      </p>

      <h1
        className="text-5xl md:text-6xl leading-tight mb-6"
        style={{ fontFamily: "Giomori, Georgia, serif", fontStyle: "italic", color: "#2d0719" }}
      >
        {post.title}
      </h1>
      <WavyRule className="mb-10" />

      <div className="space-y-5 text-ink/80 leading-relaxed text-base">
        {post.body.split("\n\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      </div>
    </div>
  );
}
