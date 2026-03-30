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
    <div className="max-w-2xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent transition-colors mb-8">
        ← Blog
      </Link>
      <h1 className="font-serif text-3xl font-bold text-heading mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
