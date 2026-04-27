import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import PostForm from "@/components/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
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
    <div style={{ maxWidth: "48rem" }}>
      <Link href="/admin/blog" className="admin-btn-ghost" style={{ display: "inline-block", marginBottom: "2rem" }}>← Journal</Link>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 className="admin-heading">Edit Entry</h1>
        <div className="admin-rule" />
      </div>
      <PostForm post={post} />
    </div>
  );
}
