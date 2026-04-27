import Link from "next/link";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div style={{ maxWidth: "48rem" }}>
      <Link href="/admin/blog" className="admin-btn-ghost" style={{ display: "inline-block", marginBottom: "2rem" }}>← Journal</Link>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 className="admin-heading">New Entry</h1>
        <div className="admin-rule" />
      </div>
      <PostForm />
    </div>
  );
}
