import Link from "next/link";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-accent transition-colors mb-8">
        ← Blog
      </Link>
      <h1 className="font-serif text-3xl font-bold text-heading mb-8">New Post</h1>
      <PostForm />
    </div>
  );
}
